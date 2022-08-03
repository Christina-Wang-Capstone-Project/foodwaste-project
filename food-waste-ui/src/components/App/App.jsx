import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import MarketGrid from "../MarketGrid/MarketGrid";
import MakeaPost from "../MakeaPost/MakeaPost";
import Home from "../Home/Home";
import MyPosts from "../MyPosts/MyPosts";
import MarketDetail from "../MarketDetail/MarketDetail";
import Map from "../Map/Map";
import NotFound from "../NotFound/NotFound";
import Basket from "../Basket/Basket";
import Loading from "../Loading/Loading";
import ProductsOnHold from "../ProductsOnHold/ProductsOnHold";
import { toaster } from "evergreen-ui";

("use strict");

export default function App() {
  const [coordinates, setCoordinates] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentUserLocationOnLogin, setCurrentUserLocationOnLogin] =
    React.useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") !== null
  ); //grabbing from localStorage storage when inspecting element

  const addAuthenticationHeader = () => {
    const currentUserId = localStorage.getItem("current_user_id");
    if (currentUserId !== null) {
      axios.defaults.headers.common = {
        current_user_id: currentUserId,
      };
    }
  };
  addAuthenticationHeader();

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("current_user_id", user["objectId"]);
    addAuthenticationHeader();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("current_user_id");
    axios.defaults.headers.common = {};
    setIsLoggedIn(false);
  };

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates([position.coords.latitude, position.coords.longitude]);
      setCurrentUserLocationOnLogin([
        position.coords.latitude,
        position.coords.longitude,
      ]);
    }); //getting location of user/product
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <LoggedOutView
                  handleLogin={handleLogin}
                  getLocation={getLocation}
                  coordinates={coordinates}
                  currentUser={currentUser}
                  setCurrentUserLocationOnLogin={setCurrentUserLocationOnLogin}
                />
              }
            />
            <Route
              path="/home/*"
              element={
                <MainApp
                  isLoggedIn={isLoggedIn}
                  handleLogout={handleLogout}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  getLocation={getLocation}
                  coordinates={coordinates}
                  currentUserLocationOnLogin={currentUserLocationOnLogin}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export function MainApp({
  isLoggedIn,
  handleLogout,
  currentUser,
  setCurrentUser,
  getLocation,
  coordinates,
  currentUserLocationOnLogin,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = React.useState([]);
  const [myProducts, setMyProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [basket, setBasket] = React.useState([]);
  const [distance, setDistance] = React.useState(25);
  const [dropdown, setDropdown] = React.useState(0);

  const URL = "http://localhost:3001";
  let HOME_URL = `http://localhost:3001/home/`;
  const DROPDOWN_URL = "http://localhost:3001/dropdown";

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("../", { replace: true });
    }
  }, []);

  useEffect(() => {
    getLocation();
    setIsLoading(true);
    axios
      .get(`${DROPDOWN_URL}/${dropdown}`)
      .then((response) => {
        let allProducts = response.data.products;
        let allProductsWithinRange = [];
        allProducts.filter((product) => {
          if (product.distance < distance) {
            allProductsWithinRange.push(product);
          }
        });
        let newProducts = allProductsWithinRange.filter((item) =>
          item.name
            .toLowerCase()
            .includes(searchTerm.replace(/\s+/g, "").toLowerCase())
        );
        setProducts(newProducts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchTerm, distance, dropdown]);

  useEffect(() => {
    setIsLoading(true);
    const currentUserId = localStorage.getItem("current_user_id");
    axios
      .get(`${URL}/user/${currentUserId}`)
      .then((res) => {
        let curUser = res.data.user;
        let myProducts = res.data.myProducts;

        setCurrentUser(curUser);
        const userProducts = myProducts.filter(
          (item) => item.user.objectId == curUser.objectId
        );
        setMyProducts(userProducts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleOnToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleAddToBasket = (product, quantity) => {
    setIsLoading(true);
    if (currentUser.objectId == product.user.objectId) {
      toaster.danger("Error: Cannot add your own product to basket.", {
        duration: 3,
      });
      setIsLoading(false);
      return;
    }
    const addProductToBasket = async (product) => {
      setIsLoading(true);
      try {
        const res = await axios.post(`${HOME_URL}${product.objectId}`, {
          currentUserId: currentUser.objectId,
          productId: product.objectId,
          quantity: quantity,
        });
        toaster.success("Successfully added to Basket!", {
          duration: 3,
        });
      } catch (error) {
        alert(error);
      }
    };
    addProductToBasket(product);
    setIsLoading(false);
  };

  return (
    <main>
      {currentUser && (
        <>
          <div className="nav-wrapper">
            <Sidebar isOpen={isOpen} handleOnToggle={handleOnToggle} />
            <Navbar
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              currentUser={currentUser}
              handleSearchChange={handleSearchChange}
              basket={basket}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              products={products}
            />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  currentUserLocationOnLogin={currentUserLocationOnLogin}
                  currentUser={currentUser}
                  searchTerm={searchTerm}
                  setDistance={setDistance}
                  distance={distance}
                  isLoading={isLoading}
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                />
              }
            />
            <>
              <Route
                path="/market"
                element={
                  <MarketGrid currentUser={currentUser} isLoading={isLoading} />
                }
              />
              <Route
                path="/makeapost"
                element={
                  <MakeaPost
                    currentUser={currentUser}
                    getLocation={getLocation}
                    coordinates={coordinates}
                  />
                }
              />
              <Route
                path="/myposts"
                element={<MyPosts myProducts={myProducts} />}
              />
              <Route
                path="/:objectId"
                element={
                  <MarketDetail
                    currentUserLocationOnLogin={currentUserLocationOnLogin}
                    currentUser={currentUser}
                    handleAddToBasket={handleAddToBasket}
                  />
                }
              />
              <Route
                path="/map"
                element={
                  <Map
                    products={products}
                    currentUserLocationOnLogin={currentUserLocationOnLogin}
                  />
                }
              />
              <Route
                path="/basket"
                element={
                  <Basket
                    currentUser={currentUser}
                    basket={basket}
                    setBasket={setBasket}
                  />
                }
              />
              <Route path="/onhold" element={<ProductsOnHold />} />
              <Route path="*" element={<NotFound />} />
            </>
          </Routes>
        </>
      )}
    </main>
  );
}

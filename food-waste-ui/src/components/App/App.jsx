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

("use strict");

export default function App() {
  const [coordinates, setCoordinates] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);
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
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = React.useState([]);
  const [myProducts, setMyProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const URL = "http://localhost:3001";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("../", { replace: true });
    }
  }, []);

  useEffect(async () => {
    setIsLoading(true);
    await axios
      .get(`${URL}/makeapost`)
      .then((response) => {
        const currentUserId = localStorage.getItem("current_user_id");
        axios.get(`${URL}/user/${currentUserId}`).then((res) => {
          let curUser = res.data.user;
          setCurrentUser(curUser);

          let allProducts = response.data.products;
          //TODO: filter products for search
          setProducts(allProducts);
          const userProducts = allProducts.filter(
            (item) => item.user.objectId == curUser.objectId
          ); //the thing with setState it is async, if setting state and doing based off state after might not update
          setMyProducts(userProducts);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      {!isLoading && currentUser && (
        <>
          <div className="nav-wrapper">
            <Sidebar isOpen={isOpen} handleOnToggle={handleOnToggle} />
            <Navbar
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              currentUser={currentUser}
            />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route path="/market" element={<>{<MarketGrid />}</>} />
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
            <Route path="/:objectId" element={<MarketDetail />} />
          </Routes>
        </>
      )}
    </main>
  );
}

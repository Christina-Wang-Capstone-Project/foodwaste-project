import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import MarketGrid from "../MarketGrid/MarketGrid";
import MakeaPost from "../MakeaPost/MakeaPost";
import Home from "../Home/Home";
("use strict");

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [userProducts, setUserProducts] = React.useState([]);
  const URL = "http://localhost:3001";
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") !== null
  ); //grabbing from localStorage storage when inspecting element

  React.useEffect(() => {
    axios
      .get(`${URL}/makeapost`)
      .then((response) => {
        let newProducts = response.data.products;
        //TODO: filter products for search
        setProducts(newProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnToggle = () => {
    setIsOpen(!isOpen);
  };

  const addAuthenticationHeader = () => {
    const currentUserId = localStorage.getItem("current_user_id");
    if (currentUserId !== null) {
      axios.defaults.headers.common = {
        current_user_id: currentUserId,
      };
    }
  };
  addAuthenticationHeader();

  const handleLogout = () => {
    localStorage.removeItem("current_user_id");
    axios.defaults.headers.common = {};
    setIsLoggedIn(false);
  };

  const handleLogin = (user) => {
    console.log(user);
    setCurrentUser(user);
    localStorage.setItem("current_user_id", user["objectId"]);
    addAuthenticationHeader();

    setIsLoggedIn(true);
  };

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates([position.coords.latitude, position.coords.longitude]);
    }); //getting location of user
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {!isLoggedIn ? (
            <LoggedOutView
              handleLogin={handleLogin}
              getUserLocation={getUserLocation}
              coordinates={coordinates}
            />
          ) : (
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
                <Route path="/" element={<Home products={products} />} />
                <Route path="/market" element={<>{<MarketGrid />}</>} />
                <Route
                  path="/makeapost"
                  element={<MakeaPost currentUser={currentUser} />}
                />
              </Routes>
            </>
          )}
        </main>
      </BrowserRouter>
    </div>
  );
}

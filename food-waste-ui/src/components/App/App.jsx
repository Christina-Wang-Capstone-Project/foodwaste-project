import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Register from "../Register/Register";
import { useEffect } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") !== null
  ); //grabbing from localStorage storage when inspecting element TODO CHANGE BECAUSE NOT AUTHENTICATED

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
    localStorage.setItem("current_user_id", user["objectId"]);
    addAuthenticationHeader();

    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {isLoggedIn ? (
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          ) : (
            <>
              <Login handleLogin={handleLogin} />
              <Register handleLogin={handleLogin} />
            </>
          )}
          <Routes>
            {/* <Route
              path="/home"
              element={
                <div className="nav-wrapper">
                  <Sidebar isOpen={isOpen} handleOnToggle={handleOnToggle} />
                  <Navbar />
                </div>
              }
            /> */}
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

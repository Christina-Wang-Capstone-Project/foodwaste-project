import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="login">
                  <Login />
                </div>
              }
            />

            <Route
              path="/home"
              element={
                <div className="nav-wrapper">
                  <Sidebar isOpen={isOpen} handleOnToggle={handleOnToggle} />
                  <Navbar />
                </div>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

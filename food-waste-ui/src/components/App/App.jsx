import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <div className="container">
            <div className="wrapper">
              <div className="nav-wrapper">
                <Navbar />
              </div>
            </div>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

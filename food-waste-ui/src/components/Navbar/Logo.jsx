import * as React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img className="logo-image" src="../../src/plant.png" alt="logo" />
      </Link>
    </div>
  );
}

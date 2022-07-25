import * as React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
("use strict");

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/home">
        <img className="logo-image" src="../../src/logo.jpg" alt="logo" />
      </Link>
    </div>
  );
}

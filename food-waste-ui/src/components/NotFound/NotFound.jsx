import * as React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
("use strict");

export default function NotFound() {
  return (
    <>
      <div className="not-found">
        <h1>
          Sorry, the page you are looking for does not appear to exist.<br></br>
          Please go back to the home page.
        </h1>
        <Link to="/home">Home</Link>
      </div>
    </>
  );
}

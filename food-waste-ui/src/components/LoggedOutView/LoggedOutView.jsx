import * as React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./LoggedOutView.css";

export default function LoggedOutView({ handleLogin }) {
  return (
    <>
      <div className="login-container">
        <Login handleLogin={handleLogin} />
      </div>
      <div className="register-container">
        <Register handleLogin={handleLogin} />
      </div>
    </>
  );
}

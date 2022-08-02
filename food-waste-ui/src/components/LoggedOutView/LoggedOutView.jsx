import * as React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./LoggedOutView.css";
import { toaster } from "evergreen-ui";
("use strict");

export default function LoggedOutView({
  handleLogin,
  getLocation,
  coordinates,
  isLoggedIn,
  currentUser,
  setCurrentUserLocationOnLogin,
}) {
  const [isNewUser, setIsNewUser] = React.useState(true);

  const handleNewUser = () => {
    setIsNewUser(!isNewUser);
  };

  return (
    <div className="block">
      {!isNewUser && (
        <div className="login-box">
          <div className="login-container">
            <div className="logo-container">
              <img className="logo" src="../../src/inapinch.jpg" />
            </div>
            <div className="title-container">
              <div className="title">Login</div>
              <button className="switch-button" onClick={handleNewUser}>
                New User? Sign up here!
              </button>
            </div>
            <Login
              handleLogin={handleLogin}
              coordinates={coordinates}
              isLoggedIn={isLoggedIn}
              getLocation={getLocation}
              currentUser={currentUser}
              setCurrentUserLocationOnLogin={setCurrentUserLocationOnLogin}
            />
          </div>
          <div className="side-image">
            <img src="../../src/neighbors.jpg" />
          </div>
        </div>
      )}
      {isNewUser && (
        <div className="register-box">
          <div className="side-image">
            <img src="../../src/registration.png" />
          </div>
          <div className="register-container">
            <div className="logo-container">
              <img className="logo" src="../../src/inapinch.jpg" />
            </div>
            <div className="title-container">
              <div className="title">Register</div>
              <button className="switch-button" onClick={handleNewUser}>
                Already have an account? Log in here!
              </button>
            </div>
            <Register
              handleLogin={handleLogin}
              coordinates={coordinates}
              isLoggedIn={isLoggedIn}
              getLocation={getLocation}
            />
          </div>
        </div>
      )}
    </div>
  );
}

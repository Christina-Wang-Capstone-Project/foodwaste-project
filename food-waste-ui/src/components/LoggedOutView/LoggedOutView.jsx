import * as React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./LoggedOutView.css";
import axios from "axios";

("use strict");

export default function LoggedOutView({
  handleLogin,
  getLocation,
  coordinates,
  isLoggedIn,
  currentUser,
  setCurrentUserLocationOnLogin,
  currentUserLocationOnLogin,
}) {
  const [isNewUser, setIsNewUser] = React.useState(true);
  const LOCATION_URL = "http://localhost:3001/location";

  const handleNewUser = () => {
    setIsNewUser(!isNewUser);
    getLocation();
  };

  React.useEffect(() => {
    if (currentUserLocationOnLogin) {
      axios
        .post(LOCATION_URL, {
          userLocation: currentUserLocationOnLogin,
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentUserLocationOnLogin]);

  return (
    <div className="block">
      {!isNewUser && (
        <div className="login-box">
          <div className="login-container">
            <div className="logo-container">
              <img className="logo" src="../src/public/inapinch.jpg" />
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
          <div className="image">
            <img className="side-image" src="../src/public/neighbors.jpg" />
          </div>
        </div>
      )}
      {isNewUser && (
        <div className="register-box">
          <div className="image">
            <img className="side-image" src="../src/public/registration.png" />
          </div>
          <div className="register-container">
            <div className="logo-container">
              <img className="logo" src="../src/public/inapinch.jpg" />
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

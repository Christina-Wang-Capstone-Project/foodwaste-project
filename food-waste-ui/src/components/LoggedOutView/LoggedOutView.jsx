import * as React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./LoggedOutView.css";
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
    <>
      <div className="block">
        {!isNewUser && (
          <div className="login-container">
            <h1 className="title"> Login</h1>
            <button className="switch-button" onClick={handleNewUser}>
              New User? Sign up
            </button>
            <Login
              handleLogin={handleLogin}
              coordinates={coordinates}
              isLoggedIn={isLoggedIn}
              getLocation={getLocation}
              currentUser={currentUser}
              setCurrentUserLocationOnLogin={setCurrentUserLocationOnLogin}
            />
          </div>
        )}
        {isNewUser && (
          <div className="register-container">
            <h1 className="title">Register</h1>
            <button className="switch-button" onClick={handleNewUser}>
              {" "}
              Already have an account? Log in
            </button>
            <Register
              handleLogin={handleLogin}
              coordinates={coordinates}
              isLoggedIn={isLoggedIn}
              getLocation={getLocation}
            />
          </div>
        )}
      </div>
    </>
  );
}

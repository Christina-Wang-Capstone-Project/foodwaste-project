import * as React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./LoggedOutView.css";

export default function LoggedOutView({ handleLogin }) {
  const [isNewUser, setIsNewUser] = React.useState(false);

  const handleNewUser = () => {
    setIsNewUser(!isNewUser);
  };

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  }); //getting location of user

  return (
    <>
      {!isNewUser && (
        <div className="login-container">
          <h1 className="title"> Login</h1>
          <button className="switch-button" onClick={handleNewUser}>
            New User? Sign up
          </button>
          <Login handleLogin={handleLogin} />
        </div>
      )}
      {isNewUser && (
        <div className="register-container">
          <h1 className="title">Register</h1>
          <button className="switch-button" onClick={handleNewUser}>
            {" "}
            Already have an account? Log in
          </button>
          <Register handleLogin={handleLogin} />
        </div>
      )}
    </>
  );
}

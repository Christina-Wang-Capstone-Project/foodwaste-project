import * as React from "react";
import "./Login.css";
import axios from "axios";
import { Button } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
("use strict");

export default function Login({
  handleLogin,
  isLoggedIn,
  setCurrentUserLocationOnLogin,
  getLocation,
  coordinates,
}) {
  const username = React.createRef();
  const password = React.createRef();
  const LOGIN_URL = "http://localhost:3001/login";
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("../home", { replace: true });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    getLocation();
    const login = async () => {
      try {
        const res = await axios.post(LOGIN_URL, {
          username: username.current.value,
          password: password.current.value,
        });
        await handleLogin(res.data.user);
        navigate("../home", { replace: true });
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    login();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span className="top-label">Username</span>
        <input placeholder="Username..." ref={username}></input>
      </label>
      <label>
        <span className="current-password">Password</span>
        <input placeholder="Password..." type="password" ref={password}></input>
      </label>
      <Button className="submit" type="submit" appearance="default">
        Login
      </Button>
    </form>
  );
}

import * as React from "react";
import "./Login.css";
import axios from "axios";
import { Button, toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
("use strict");

export default function Login({
  handleLogin,
  isLoggedIn,
  getLocation,
  coordinates,
}) {
  const username = React.createRef();
  const password = React.createRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("../home", { replace: true });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    getLocation();
    const login = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_URL}/login`, {
          username: username.current.value,
          password: password.current.value,
        });
        await handleLogin(res.data.user);
        navigate("../home", { replace: true });
      } catch (err) {
        toaster.danger("Error logging in. Please try again", {
          duration: 3,
        });
      }
    };
    login();
    toaster.notify("Logging in now...", {
      duration: 1,
    });
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="username">
        <span className="top-label">Username</span>
        <input
          className="general-input"
          placeholder="Username..."
          ref={username}
        ></input>
      </label>
      <label>
        <span className="current-password">Password</span>
        <input
          className="general-input"
          placeholder="Password..."
          type="password"
          ref={password}
        ></input>
      </label>
      <Button className="submit" type="submit" appearance="default">
        Login
      </Button>
    </form>
  );
}

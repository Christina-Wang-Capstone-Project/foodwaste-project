import * as React from "react";
import "./Login.css";
import axios from "axios";
import { Button } from "evergreen-ui";

export default function Login({ handleLogin, coordinates }) {
  const username = React.createRef();
  const password = React.createRef();
  const URL = "http://localhost:3001";

  const handleSubmit = (event) => {
    event.preventDefault();

    const login = async () => {
      try {
        console.log("Logging in");
        const res = await axios.post(`${URL}/login`, {
          username: username.current.value,
          password: password.current.value,
          location: coordinates,
        });
        handleLogin(res.data.user);
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

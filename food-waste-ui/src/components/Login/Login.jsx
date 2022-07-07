import * as React from "react";
import "./Login.css";
import axios from "axios";

export default function Login({ handleLogin }) {
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
      <h1 className="title"> Login</h1>
      <label>
        <span className="username">Username</span>
        <input ref={username}></input>
      </label>
      <label>
        <span className="password">Password</span>
        <input type="password" ref={password}></input>
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

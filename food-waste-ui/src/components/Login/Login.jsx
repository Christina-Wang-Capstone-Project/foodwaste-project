import * as React from "react";
import "./Login.css";
import axios from "axios";

export default function Login({ handleLogin }) {
  const email = React.createRef();
  const username = React.createRef();
  const password = React.createRef();
  const URL = "http://localhost:3001";

  const handleSubmit = (event) => {
    event.preventDefault();

    const login = async () => {
      try {
        console.log("Logging in");
        const res = await axios.post(`${URL}/login`, {
          email: email.current.value,
          user: username.current.value,
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
      <div className="title">Login</div>

      <label>
        <span>Email</span>
        <input ref={email}></input>
      </label>
      <label>
        <span>Username</span>
        <input ref={username}></input>
      </label>
      <label>
        <span>Password</span>
        <input type="password" ref={password}></input>
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

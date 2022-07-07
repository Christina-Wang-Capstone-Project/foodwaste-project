import * as React from "react";
//import "./Register.css"
import axios from "axios";

export default function Register({ handleLogin }) {
  const email = React.createRef();
  const username = React.createRef();
  const password = React.createRef();
  const URL = "http://localhost:3001";

  const handleSubmit = (event) => {
    event.preventDefault();

    const register = async () => {
      try {
        const res = await axios.post(`${URL}/register`, {
          email: email.current.value,
          username: username.current.value,
          password: password.current.value,
        });
        handleLogin(res.data.user);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    register();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="title">Register</div>
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
      <button type="submit">Register</button>
    </form>
  );
}

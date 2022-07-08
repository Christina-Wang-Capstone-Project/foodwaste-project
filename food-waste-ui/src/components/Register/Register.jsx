import * as React from "react";
//import "./Register.css"
import axios from "axios";

export default function Register({ handleLogin, coordinates }) {
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
          location: coordinates,
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
      <label>
        <span className="top-label">Email</span>
        <input placeholder="Email..." ref={email}></input>
      </label>
      <label>
        <span>Username</span>
        <input placeholder="Username..." ref={username}></input>
      </label>
      <label>
        <span>Password</span>
        <input placeholder="Password..." type="password" ref={password}></input>
      </label>
      <button className="submit" type="submit">
        Register
      </button>
    </form>
  );
}

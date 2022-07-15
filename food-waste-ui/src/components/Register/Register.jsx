import * as React from "react";
//import "./Register.css"
import axios from "axios";
import { Button } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

export default function Register({ handleLogin, coordinates, isLoggedIn }) {
  const email = React.createRef();
  const username = React.createRef();
  const password = React.createRef();
  const URL = "http://localhost:3001";
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("../home", { replace: true });
    }
  }, []);

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
        navigate("../home", { replace: true });
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
      <Button className="submit" type="submit" appearance="default">
        Register
      </Button>
    </form>
  );
}

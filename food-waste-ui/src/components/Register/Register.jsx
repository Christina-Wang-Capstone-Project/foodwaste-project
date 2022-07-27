import * as React from "react";
import axios from "axios";
import { Button, TextInputField } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

("use strict");

export default function Register({ handleLogin, coordinates, isLoggedIn }) {
  const [isLoading, setIsLoading] = React.useState(false);
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

  setIsLoading(true);
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
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

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

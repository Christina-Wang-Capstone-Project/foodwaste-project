import * as React from "react";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus(); //first time put focus on first input when component loads
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]); //empty error message if user changes state of password or username

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser("");
    setPwd("");
  };
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errMsg" : "hidden"}
        aria-live="assertive" //screen reader announce message when focus is set on this paragraph
      >
        {errMsg}
      </p>
      <h1>Welcome</h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email"> Email:</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          onChange={(event) => setUser(event.target.value)}
          value={user}
        />
        <label htmlFor="password"> Password:</label>
        <input
          type="password"
          id="password"
          onChange={(event) => setPwd(event.target.value)}
          value={pwd}
        />
        <Link to={"/home"}>
          <button type="submit">Log In</button>
        </Link>
      </form>
      <p className="signup">
        {" "}
        Need an Account? <br />
        <span className="line">
          {/*put router link here */}
          <a href="signup">Sign up</a>
        </span>
      </p>
    </section>
  );
}
{
  /* <div>
          <Link to={"/home"}>
            <button type="submit">Log In</button>
          </Link>
        </div> */
}

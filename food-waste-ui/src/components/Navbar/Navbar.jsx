import * as React from "react";
import "./Navbar.css";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ isLoggedIn, handleLogout }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const sideBarWidth = 900;

  const onClick = (event) => {
    event.preventDefault();
    handleLogout();
    console.log(isLoggedIn);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const navPages = ["Home", "Market", "Make A Post", "Basket"];
  // const sideBarPages = [
  //   "Home",
  //   "Market",
  //   "Map",
  //   "Make a Post",
  //   "About Us",
  //   "Contact Us",
  // ];

  return (
    <nav className="navbar">
      <div className="navbar-home">
        <Logo />
        <a href="/home" className="store-name">
          WEBSITE TITLE
        </a>
      </div>
      {screenWidth > sideBarWidth &&
        navPages.map((page) => {
          let navItem = page.replace(/\s+/g, "");
          return (
            <Link to={`${navItem.toLowerCase()}`} key={page}>
              {page}
            </Link>
          );
        })}
      {isLoggedIn && (
        <Link to="/" onClick={onClick}>
          Log Out
        </Link>
      )}
    </nav>
  );
}

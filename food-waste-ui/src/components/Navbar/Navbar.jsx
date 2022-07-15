import * as React from "react";
import "./Navbar.css";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pane, Avatar } from "evergreen-ui";
import { Popover, Position, Menu, Button } from "evergreen-ui";
("use strict");

export default function Navbar({ isLoggedIn, handleLogout, currentUser }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const sideBarWidth = 900;

  const logOut = async (event) => {
    event.preventDefault();
    await handleLogout();
    console.log("are we logged in", isLoggedIn);
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

  const navPages = ["Market", "Make A Post", "Basket"];
  const sideBarPages = [
    "Market",
    "Map",
    "Make a Post",
    "About Us",
    "Contact Us",
  ];

  return (
    <nav className="navbar">
      <div className="navbar-home">
        <Logo />
        <Link to="/home" className="store-name">
          WEBSITE TITLE
        </Link>
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
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item>Profile Settings</Menu.Item>
              <Menu.Item>
                <Link to="myposts">My Posts</Link>
              </Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group>
              <Menu.Item>
                {isLoggedIn && (
                  <Link to="/" onClick={logOut} className="logout-button">
                    Log Out
                  </Link>
                )}
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <Pane>
          <Avatar size={35} marginTop={9} name={`${currentUser.username}`} />
        </Pane>
      </Popover>
    </nav>
  );
}

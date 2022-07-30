import * as React from "react";
import "./Navbar.css";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pane, Avatar } from "evergreen-ui";
import { Popover, Position, Menu } from "evergreen-ui";
("use strict");
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import { HashLink } from "react-router-hash-link";

export default function Navbar({
  isLoggedIn,
  handleLogout,
  currentUser,
  handleSearchChange,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const sideBarWidth = 1050;

  const navigate = useNavigate();

  const logOut = async (event) => {
    event.preventDefault();
    await handleLogout();
    navigate("../", { replace: true });
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

  return (
    <header className="navbar">
      <div className="navbar-home">
        <Logo />
        <a href="/home">
          <img
            className="store-name-img"
            src="../../src/inapinch.jpg"
            alt="In A Pinch"
          />
        </a>
      </div>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search for an item"
          onChange={(e) => handleSearchChange(e)}
        />
        <SearchIcon className="search-icon" />
      </div>
      <div className="navbar-menu-items">
        {screenWidth > sideBarWidth && (
          <>
            <HashLink smooth to="/home/#market">
              Market
            </HashLink>
            <Link to="/home/makeapost">Make a Post</Link>
            <Link to="/home/basket">Basket</Link>
          </>
        )}
        <Popover
          position={Position.BOTTOM_LEFT}
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item>
                  <Link to="onhold">My Item Orders</Link>
                </Menu.Item>
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
            <Avatar size={35} marginTop={9} name={currentUser.username} />
          </Pane>
        </Popover>
      </div>
    </header>
  );
}

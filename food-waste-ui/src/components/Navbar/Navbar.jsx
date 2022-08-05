import * as React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pane, Avatar } from "evergreen-ui";
import { Popover, Position, Menu, Badge } from "evergreen-ui";
("use strict");
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import axios from "axios";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export default function Navbar({
  isLoggedIn,
  handleLogout,
  currentUser,
  handleSearchChange,
  setSearchTerm,
  searchTerm,
  basket,
  products,
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
  }, [basket]);

  return (
    <header className="navbar">
      <div className="navbar-home">
        <Link to="/home">
          <img className="store-name-img" src="inapinch.jpg" alt="In A Pinch" />
        </Link>
      </div>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          size="50"
          value={searchTerm}
          placeholder="Search for an item"
          onChange={(e) => handleSearchChange(e)}
        />

        <SearchIcon
          className="search-icon"
          onClick={() => setSearchTerm(searchTerm)}
        />
      </div>
      <div className="navbar-menu-items">
        {screenWidth > sideBarWidth && (
          <>
            <Link to="/home">Market</Link>
            <Link to="/home/makeapost">Make a Post</Link>
            <Link to="/home/basket">
              <ShoppingBasketIcon />
            </Link>
          </>
        )}
        <Popover
          className="menu-items"
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

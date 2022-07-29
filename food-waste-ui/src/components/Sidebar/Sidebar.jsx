import * as React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { animated } from "react-spring";
import { HashLink } from "react-router-hash-link";
("use strict");

export default function Sidebar(props) {
  let sidebarProperty = "sidebar";
  let buttonProperty = "toggle-button";
  if (props.isOpen) {
    sidebarProperty = "sidebar open";
    buttonProperty = "toggle-button button-open";
  }

  const sidebarPages = ["Map", "Make a Post", "About Us", "Contact Us"];

  return (
    <animated.div className={sidebarProperty}>
      {props.isOpen ? (
        <>
          <button className={buttonProperty} onClick={props.handleOnToggle}>
            <img
              className="food-button"
              src="../../src/food.png"
              alt="food icon"
            ></img>
          </button>{" "}
          <div className="sidebar-container">
            <HashLink smooth to="/home/#market">
              Market
            </HashLink>
            {sidebarPages.map((page) => {
              let sidebarItem = page.replace(/\s+/g, "");
              return (
                <Link
                  to={`${sidebarItem.toLowerCase()}`}
                  key={page}
                  className="sidebar-items"
                >
                  {page}
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <button className={buttonProperty} onClick={props.handleOnToggle}>
          {" "}
          <img
            className="food-button"
            src="../../src/food.png"
            alt="food icon"
          ></img>
        </button>
      )}
    </animated.div>
  );
}

import * as React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  let sidebarProperty = "sidebar";
  let buttonProperty = "toggle-button";
  if (props.isOpen) {
    sidebarProperty = "sidebar open";
    buttonProperty = "toggle-button button-open";
  }

  const sidebarPages = [
    "Home",
    "Market",
    "Map",
    "Make a Post",
    "About Us",
    "Contact Us",
  ];

  return (
    <div className={sidebarProperty}>
      {props.isOpen ? (
        <>
          <button className={buttonProperty} onClick={props.handleOnToggle}>
            <img
              className="food-button"
              src="../../src/food.png"
              alt="food icon"
            ></img>
          </button>{" "}
          <div className="sidebar-items">
            {sidebarPages.map((page) => {
              let sidebarItem = page.replace(/\s+/g, "");
              return (
                <Link
                  to={`${
                    sidebarItem.toLowerCase() !== "home"
                      ? sidebarItem.toLowerCase()
                      : "/"
                  }`}
                  key={page}
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
    </div>
  );
}

import * as React from "react";
import "./Sidebar.css";

export default function Sidebar(props) {
  let sidebarProperty = "sidebar";
  let buttonProperty = "toggle-button";

  if (props.isOpen) {
    sidebarProperty = "sidebar open";
    buttonProperty = "toggle-button button-open";
  }
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

import * as React from "react";
import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <div className={props.isOpen ? "sidebar-open" : "sidebar-closed"}>
      <button className="toggle-button" onClick={() => props.handleOnToggle()}>
        ≡
      </button>

      {!props.isOpen ? (
        " "
      ) : (
        <>
          <div className="shoppingCart">Testing sidebar</div>
        </>
      )}
    </div>
  );
}

import * as React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <div className="welcome">WELCOME!</div>
      <div className="find">Find Your Merch!</div>
      <div className="statement">
        We have all kinds of goodies. Click on any of the items to start filling
        up your shopping cart. Checkout whenever you're ready.
      </div>
      <img
        className="hero-img"
        src="https://codepath-student-store-demo.surge.sh/assets/student_store_icon.18e5d61a.svg"
        alt="home image"
      ></img>
    </div>
  );
}

import * as React from "react";
import MarketGrid from "../MarketGrid/MarketGrid";
import "./MyPosts.css";

("use strict");

export default function MyPosts({ myProducts }) {
  return (
    <>
      <div className="my-posts-wrapper">
        <h3 className="message">My Posts</h3>
        <div className="my-posts-container">
          <MarketGrid products={myProducts} />
        </div>
      </div>
    </>
  );
}

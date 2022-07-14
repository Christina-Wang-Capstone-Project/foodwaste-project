import * as React from "react";
import MarketGrid from "../MarketGrid/MarketGrid";
import "./MyPosts.css";

("use strict");

export default function MyPosts({ myProducts }) {
  return (
    <>
      <h3 className="noProducts-message">My Posts</h3>
      <MarketGrid products={myProducts} />
    </>
  );
}

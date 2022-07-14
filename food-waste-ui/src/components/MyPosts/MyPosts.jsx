import * as React from "react";
import MarketGrid from "../MarketGrid/MarketGrid";
("use strict");

export default function MyPosts({ myProducts }) {
  return (
    <>
      <h3>My Posts</h3>
      <MarketGrid products={myProducts} />
    </>
  );
}

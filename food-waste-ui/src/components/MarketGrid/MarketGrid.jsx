import * as React from "react";
import "./MarketGrid.css";
import MarketCard from "../MarketCard/MarketCard";

export default function MarketGrid({ allProducts }) {
  //post products from make a post
  if (allProducts == 0) {
    return (
      <h3>
        There doesn't seem to be any available items nearby. Make a post to
        start sharing!
      </h3>
    );
  } else {
    return (
      <div className="market">
        <h3> Available Items on the Market</h3>
        <div className="grid">
          {allProducts &&
            allProducts.map((item) => {
              return <MarketCard product={item} />;
            })}
        </div>
      </div>
    );
  }
}

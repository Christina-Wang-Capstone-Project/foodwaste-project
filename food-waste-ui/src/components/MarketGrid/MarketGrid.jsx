import * as React from "react";
import "./MarketGrid.css";
import MarketCard from "../MarketCard/MarketCard";

export default function MarketGrid({ products }) {
  //post products from make a post
  if (products == 0) {
    return (
      <h3 className="noProducts-message">
        There doesn't seem to be any available items nearby. Make a post to
        start sharing!
      </h3>
    );
  } else {
    return (
      <div className="market">
        <div className="grid">
          {products &&
            products.map((item) => {
              return <MarketCard product={item} />;
            })}
        </div>
      </div>
    );
  }
}

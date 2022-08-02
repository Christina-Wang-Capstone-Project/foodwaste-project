import * as React from "react";
import "./MarketGrid.css";
import MarketCard from "../MarketCard/MarketCard";
import { Combobox } from "evergreen-ui";
("use strict");

export default function MarketGrid({
  products,
  currentUser,
  setDistance,
  distance,
}) {
  const [range, setRange] = React.useState(`<${distance} miles`);

  const handleRangeChange = (e) => {
    setRange(e);
    setDistance(e.replace(/\D/g, ""));
  };

  //posts products from make a post
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
        <div id="market" className="market-title">
          Marketplace
        </div>
        <div className="market-range">
          Check out what your neighbors {range} away have to share!
        </div>
        <div className="market-location">
          <Combobox
            initialSelectedItem={{ label: "<25 miles" }}
            items={[
              { label: "<5 miles" },
              { label: "<10 miles" },
              { label: "<25 miles" },
            ]}
            itemToString={(item) => (item ? item.label : "")}
            onChange={(selected) => handleRangeChange(selected.label)}
          />
        </div>
        <div className="grid">
          {products &&
            products.map((item) => (
              <MarketCard
                product={item}
                key={item.objectId}
                currentUser={currentUser}
              />
            ))}
        </div>
      </div>
    );
  }
}

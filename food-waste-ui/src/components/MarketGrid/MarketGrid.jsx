import * as React from "react";
import "./MarketGrid.css";
import MarketCard from "../MarketCard/MarketCard";
import { Combobox, SelectMenu, Button, Position } from "evergreen-ui";
import Loading from "../Loading/Loading";

("use strict");

export default function MarketGrid({
  products,
  currentUser,
  setDistance,
  distance,
  isLoading,
  dropdown,
  setDropdown,
}) {
  const [range, setRange] = React.useState(`<${distance} miles`);
  const [selected, setSelected] = React.useState(null);

  const handleRangeChange = (e) => {
    setRange(e);
    setDistance(e.replace(/\D/g, ""));
  };

  const handleDropDownSelect = (value) => {
    setSelected(value);
    if (value == "Distance: low to high") {
      setDropdown(0);
    } else if (value == "Distance: high to low") {
      setDropdown(1);
    } else if (value == "Newest arrivals") {
      setDropdown(2);
    } else if (value == "About to expire") {
      setDropdown(3);
    }
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
          <div className="dropdown">
            <SelectMenu
              title="Sort by:"
              options={[
                "Distance: low to high",
                "Distance: high to low",
                "Newest arrivals",
                "About to expire",
              ].map((label) => ({ label, value: label }))}
              selected={selected}
              onSelect={(item) => handleDropDownSelect(item.value)}
              hasFilter={false}
              position={Position.BOTTOM_RIGHT}
              height={180}
            >
              <Button>{selected || "Sort by:"}</Button>
            </SelectMenu>
          </div>
        </div>
        {!isLoading ? (
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
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

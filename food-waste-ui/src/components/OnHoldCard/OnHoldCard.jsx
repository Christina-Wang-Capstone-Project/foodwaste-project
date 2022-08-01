import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { reverseGeoCodeAddress } from "../../constants/geoCodesToAddress";
import "./OnHoldCard.css";
import { Popover, Position, Menu, Button, toaster } from "evergreen-ui";
("use strict");

export default function OnHoldCard({ product, quantity }) {
  const [location, setLocation] = React.useState("");
  const [status, setStatus] = React.useState("Not Picked Up Yet ✘");

  React.useEffect(() => {
    reverseGeoCodeAddress(product.location)
      .then((address) => setLocation(address))
      .catch((error) => console.error(error));
  }, []);

  const handlePickUp = () => {
    setStatus("Picked Up ✔");
    toaster.success("Thank you for picking up your item!");
  };

  const handleNotPickedUp = () => {
    setStatus("Not Picked Up Yet ✘");
    toaster.notify(`Please pick up your item within 5 days at ${location}`);
  };
  return (
    <>
      <div className="onhold-container">
        <div className="onhold-card">
          <img
            className="basket-image"
            src={product.file.url}
            alt={product.name}
          ></img>
          <div className="basket-details">
            <p className="product-name">{product.name}</p>
            <p className="product-quantity"> Quantity: {quantity} </p>
            <p className="product-location"> Pickup Location: {location}</p>
          </div>
        </div>
        <div className="onhold-toggle">
          <Popover
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <Menu.Group>
                  <Menu.Item onSelect={() => handleNotPickedUp()}>
                    Not Picked Up Yet ✘
                  </Menu.Item>
                  <Menu.Item onSelect={() => handlePickUp()}>
                    Picked Up ✔
                  </Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                  <Menu.Item
                    onSelect={() =>
                      toaster.danger("Removing your item from checkout now...")
                    }
                    intent="danger"
                  >
                    I don't want this item anymore
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }
          >
            <Button marginRight={16}>{status}</Button>
          </Popover>
        </div>
      </div>
    </>
  );
}

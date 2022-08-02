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
  const PICKED_UP_URL = `http://localhost:3001/home/pickedup`;
  const REVERSE_PICK_UP_BACK_TO_ON_HOLD_URL = `http://localhost:3001/home/reversepickup`;
  const DELETE_ON_HOLD_URL = `http://localhost:3001/home/deleteoffonhold`;

  React.useEffect(() => {
    reverseGeoCodeAddress(product.location)
      .then((address) => setLocation(address))
      .catch((error) => console.error(error));
  }, []);

  const handlePickUp = (product) => {
    setStatus("Picked Up ✔");
    axios.post(PICKED_UP_URL, {
      productId: product.objectId,
      quantity: quantity,
    });
    toaster.success("Thank you for picking up your item!");
  };

  const handleNotPickedUp = (product) => {
    setStatus("Not Picked Up Yet ✘");
    axios.post(REVERSE_PICK_UP_BACK_TO_ON_HOLD_URL, {
      productId: product.objectId,
      quantity: quantity,
    });
    toaster.notify(`Please pick up your item within 5 days at ${location}`);
  };

  const handleDeleteItemFromOnHold = (product) => {
    toaster.danger("Removing your item from checkout now...");
    axios.post(DELETE_ON_HOLD_URL, {
      productId: product.objectId,
      quantity: quantity,
    });
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
                  <Menu.Item onSelect={() => handleNotPickedUp(product)}>
                    Not Picked Up Yet ✘
                  </Menu.Item>
                  <Menu.Item onSelect={() => handlePickUp(product)}>
                    Picked Up ✔
                  </Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                  <Menu.Item
                    onSelect={() => handleDeleteItemFromOnHold(product)}
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

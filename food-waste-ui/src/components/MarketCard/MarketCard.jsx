import * as React from "react";
import "./MarketCard.css";
import { Pane, Badge, Button } from "evergreen-ui";
import { Link } from "react-router-dom";
("use strict");

export default function MarketCard(product) {
  const curProduct = product.product;
  const [isOnHold, setIsOnHold] = React.useState(false);

  const handleOnToggle = () => {
    setIsOnHold(!isOnHold);
  };

  return (
    <div className="product-card ">
      <Link to={curProduct.objectId}>
        <img
          className="product-image"
          src={curProduct.file.url}
          alt={curProduct.objectId}
        />
      </Link>
      <div className="description-button-wrapper">
        <div className="product-text-container">
          <div className="product-name">{curProduct.name}</div>
          <div className="product-description">{curProduct.description}</div>
          <div className="product-quantity">{curProduct.quantity}</div>
        </div>
        <div className="product-button">
          <Button>Add to Basket</Button>
        </div>
      </div>
    </div>
  );
}

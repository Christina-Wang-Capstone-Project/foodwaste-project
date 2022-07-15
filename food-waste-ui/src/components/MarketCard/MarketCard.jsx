import * as React from "react";
import "./MarketCard.css";
import { Pane, Badge, Button } from "evergreen-ui";

export default function MarketCard(product) {
  const curProduct = product.product;
  const [isOnHold, setIsOnHold] = React.useState(false);

  const handleOnToggle = () => {
    setIsOnHold(!isOnHold);
  };

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={curProduct.file.url}
        alt={curProduct.objectId}
      />
      <div className="description-button-wrapper">
        <div className="product-text-container">
          <div className="product-name">{curProduct.name}</div>
          <div className="product-description">{curProduct.description}</div>
          <div className="product-quantity">{curProduct.quantity}</div>
        </div>
        <div className="onhold-button">
          <button onClick={handleOnToggle}>
            {isOnHold ? (
              <Badge color="blue">On Hold</Badge>
            ) : (
              <Badge color="green"> Available</Badge>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

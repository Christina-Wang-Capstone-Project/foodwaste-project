import * as React from "react";
import "./MarketCard.css";
import { Pane, Badge, Button } from "evergreen-ui";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

("use strict");

export default function MarketCard({ product, currentUser }) {
  const [isOnHold, setIsOnHold] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const PRODUCT_URL = `http://localhost:3001/home/${product.objectId}`;

  const handleOnToggle = () => {
    setIsOnHold(!isOnHold);
  };

  const handleAddToBasket = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (currentUser.objectId == product.user.objectId) {
      alert("Error: Cannot add your own product to basket.");
      return;
    }
    const addProductToBasket = async () => {
      try {
        const res = await axios.post(PRODUCT_URL, {
          userId: currentUser.objectId,
        });
      } catch (error) {
        alert(error);
      }
    };
    addProductToBasket();
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="product-card ">
      <Link to={product.objectId}>
        <img
          className="product-image"
          src={product.file.url}
          alt={product.objectId}
        />
      </Link>
      <div className="description-button-wrapper">
        <div className="product-text-container">
          <div className="product-name">{product.name}</div>
          <div className="product-description">{product.description}</div>
          <div className="product-quantity">{product.quantity}</div>
        </div>
        <div className="product-button">
          <Button onClick={handleAddToBasket}>Add to Basket</Button>
        </div>
      </div>
    </div>
  );
}

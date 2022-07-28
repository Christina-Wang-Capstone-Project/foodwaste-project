import * as React from "react";
import "./MarketCard.css";
import { Pane, Badge, Button } from "evergreen-ui";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

("use strict");

export default function MarketCard({ product, currentUser }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const ADD_TO_BASKET_URL = `http://localhost:3001/home/${product.objectId}`;

  const handleAddToBasket = (product) => {
    setIsLoading(true);
    if (currentUser.objectId == product.user.objectId) {
      alert("Error: Cannot add your own product to basket.");
      setIsLoading(false);
      return;
    }
    const addProductToBasket = async (product) => {
      setIsLoading(true);
      try {
        const res = await axios.post(ADD_TO_BASKET_URL, {
          currentUserId: currentUser.objectId,
          productId: product.objectId,
        });
        alert("Successfully added to basket!");
      } catch (error) {
        alert(error);
      }
    };
    addProductToBasket(product);
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
          <Button onClick={() => handleAddToBasket(product)}>
            Add to Basket
          </Button>
        </div>
      </div>
    </div>
  );
}

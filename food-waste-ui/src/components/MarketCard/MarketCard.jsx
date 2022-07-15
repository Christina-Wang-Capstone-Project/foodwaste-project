import * as React from "react";
import "./MarketCard.css";

export default function MarketCard(product) {
  const curProduct = product.product;

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={curProduct.file.url}
        alt={curProduct.objectId}
      />
      <div className="product-text-container">
        <div className="product-name">{curProduct.name}</div>
        <div className="product-description">{curProduct.description}</div>
        <div className="product-quantity">{curProduct.quantity}</div>
      </div>
    </div>
  );
}

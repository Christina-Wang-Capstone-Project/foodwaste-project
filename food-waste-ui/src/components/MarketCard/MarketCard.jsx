import * as React from "react";
import "./MarketCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import { formatDate } from "../../constants/formatDate";
import { Badge } from "evergreen-ui";
("use strict");

export default function MarketCard({ product }) {
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
          <div className="product-description">
            {product.description.substring(0, 20)}...
          </div>
          <div className="product-quantity">Quantity: {product.quantity}</div>
          <div className="product-dates">
            <p>Post Created on: {formatDate(product.createdAt)}</p>
            <p> Expiration Date: {formatDate(product.date)}</p>
          </div>
        </div>
      </div>
      <div className="product-badge">
        <Badge color="teal" marginRight={8}>
          {product.distance} mile(s) away
        </Badge>
      </div>
    </div>
  );
}

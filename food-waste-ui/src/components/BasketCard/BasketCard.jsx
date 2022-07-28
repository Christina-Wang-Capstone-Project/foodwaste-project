import * as React from "react";
import { IconButton, TrashIcon } from "evergreen-ui";
import "./BasketCard.css";

export default function BasketCard({ product, handleRemoveItemFromBasket }) {
  return (
    <>
      <div className="basket-card">
        <p className="product-name">{product.name}</p>
        <img src={product.file.url} alt={product.name}></img>
        <p> {product.quantity} </p>

        <IconButton
          icon={TrashIcon}
          className="remove-button"
          onClick={() => handleRemoveItemFromBasket(product)}
        ></IconButton>
      </div>
    </>
  );
}

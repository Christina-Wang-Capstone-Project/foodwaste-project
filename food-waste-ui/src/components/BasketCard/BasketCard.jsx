import * as React from "react";
import axios from "axios";
import { IconButton, TrashIcon } from "evergreen-ui";

export default function BasketCard({ product, handleRemoveItemFromBasket }) {
  return (
    <>
      <div className="basket-card">
        <h1>{product.name}</h1>
      </div>
      <IconButton
        icon={TrashIcon}
        className="remove-button"
        onClick={() => handleRemoveItemFromBasket(product)}
      ></IconButton>
    </>
  );
}

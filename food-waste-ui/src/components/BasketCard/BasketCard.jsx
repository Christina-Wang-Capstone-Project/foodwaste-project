import * as React from "react";
import { IconButton, TrashIcon } from "evergreen-ui";
import "./BasketCard.css";
import { reverseGeoCodeAddress } from "../../constants/geoCodesToAddress";
import { useEffect } from "react";

export default function BasketCard({ product, handleRemoveItemFromBasket }) {
  const [location, setLocation] = React.useState("");

  useEffect(() => {
    console.log("product location", product.location);
    reverseGeoCodeAddress(product.location)
      .then((address) => setLocation(address))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="basket-card">
        <p className="product-name">{product.name}</p>
        <img
          className="product-image"
          src={product.file.url}
          alt={product.name}
        ></img>
        <p clasName="product-quantity">{product.quantity} </p>
        <p className="product-location">{location}</p>

        <IconButton
          icon={TrashIcon}
          className="remove-button"
          onClick={() => handleRemoveItemFromBasket(product)}
        ></IconButton>
      </div>
    </>
  );
}

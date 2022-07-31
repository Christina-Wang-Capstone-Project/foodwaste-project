import * as React from "react";
import { IconButton, TrashIcon } from "evergreen-ui";
import "./BasketCard.css";
import { reverseGeoCodeAddress } from "../../constants/geoCodesToAddress";
import { useEffect } from "react";

export default function BasketCard({
  product,
  handleRemoveItemFromBasket,
  quantity,
}) {
  const [location, setLocation] = React.useState("");

  useEffect(() => {
    reverseGeoCodeAddress(product.location)
      .then((address) => setLocation(address))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="basket-card">
        <img
          className="basket-image"
          src={product.file.url}
          alt={product.name}
        ></img>
        <div className="basket-details">
          <p className="product-name">{product.name}</p>
          <p className="product-quantity"> Quantity: {quantity} </p>
          <p className="product-location">{location}</p>

          <IconButton
            icon={TrashIcon}
            className="remove-button"
            onClick={() => handleRemoveItemFromBasket(product, quantity)}
          ></IconButton>
        </div>
      </div>
    </>
  );
}

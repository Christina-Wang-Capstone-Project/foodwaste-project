import * as React from "react";
import { useState } from "react";
import axios from "axios";
import "./ProductsOnHold.css";
import Loading from "../Loading/Loading";
import BasketCard from "../BasketCard/BasketCard";

export default function ProductsOnHold() {
  const ON_HOLD_URL = "http://localhost:3001/home/onhold";
  const [productsOnHold, setProductsOnHold] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(ON_HOLD_URL)
      .then((response) => {
        let allProductsOnHold = response.data.productsOnHold;
        setProductsOnHold(allProductsOnHold);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return productsOnHold != null && productsOnHold.length > 0 ? (
    <div className="basket-container">
      {productsOnHold.map((product) => {
        return (
          <div className="basket-container">
            <BasketCard
              key={product.product.objectId}
              product={product.product}
              quantity={product.quantity}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <p className="empty-basket">
      You have no products currently on hold. Check out the market to see what
      your neighbors are sharing!
    </p>
  );
}

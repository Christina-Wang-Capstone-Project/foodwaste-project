import * as React from "react";
import { useState } from "react";
import axios from "axios";
import "./ProductsOnHold.css";
import Loading from "../Loading/Loading";
import OnHoldCard from "../OnHoldCard/OnHoldCard";
("use strict");

export default function ProductsOnHold() {
  const [productsOnHold, setProductsOnHold] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_HOME_URL}/onhold`)
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
      <div className="onhold-title">Order List</div>
      {productsOnHold.map((product) => {
        return (
          <div className="basket-container" key={product.product.objectId}>
            <OnHoldCard product={product.product} quantity={product.quantity} />
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

import * as React from "react";
import axios from "axios";
import "./Basket.css";
import BasketCard from "../BasketCard/BasketCard";

export default function Basket({ currentUser }) {
  const [basket, setBasket] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const currentUserId = localStorage.getItem("current_user_id");

  const handleRemoveItemFromBasket = (product) => {
    let tempBasket = [...basket]; //make a deep copy of basket
    tempBasket = tempBasket.filter((item) => item !== product);
    setBasket(tempBasket);
    try {
      axios.post("http://localhost:3001/home/basket", {
        productId: product.objectId,
      });
    } catch (error) {
      console.log("Error deleting item from cart", error);
    }
  };
  React.useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3001/makeapost").then((response) => {
      let allProducts = response.data.products;
      let allProductsInBasket = [];

      allProducts.map((product) => {
        if (product.basket && product.basket.includes(currentUserId)) {
          allProductsInBasket.push(product);
        } //check if user has product in basket from the product object
      });
      setBasket(allProductsInBasket);
    });
  }, []);

  return basket.length > 0 ? (
    <div className="basket-container">
      {basket.map((product) => {
        return (
          <BasketCard
            key={product.objectId}
            product={product}
            handleRemoveItemFromBasket={handleRemoveItemFromBasket}
          />
        );
      })}
    </div>
  ) : (
    <p className="empty-basket">
      There seems to be no items in your basket. Check out the market to see
      what your neighbors are sharing!
    </p>
  );
}

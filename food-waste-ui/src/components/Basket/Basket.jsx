import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Basket.css";

export default function Basket({ currentUser }) {
  const [basket, setBasket] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const currentUserId = localStorage.getItem("current_user_id");

  React.useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3001/makeapost").then((response) => {
      let allProducts = response.data.products;
      let allProductsInBasket = [];
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].basket) {
          for (let j = 0; j < allProducts[i].basket.length; j++) {
            if (allProducts[i].basket[j] == currentUserId) {
              allProductsInBasket.push(allProducts[i]);
            }
          }
        }
      }
      setBasket(allProductsInBasket);
    });
  }, []);

  return basket && basket.length > 0 ? (
    basket.map((product) => {
      return <h1>{product.name}</h1>;
    })
  ) : (
    <h1>
      There seems to be no items in your basket. Check out the market to see
      what your neighbors are sharing!
    </h1>
  );
}

import * as React from "react";
import axios from "axios";
import "./Basket.css";
import BasketCard from "../BasketCard/BasketCard";
import { Button, Pane, Spinner } from "evergreen-ui";
import Loading from "../Loading/Loading";

export default function Basket({ currentUser }) {
  const [basket, setBasket] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const currentUserId = localStorage.getItem("current_user_id");

  const handleRemoveItemFromBasket = (product) => {
    let tempBasket = [...basket]; //makes a deep copy of basket
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

  const handleAddItemsOnHold = () => {
    try {
      axios.post("http://localhost:3001/home", {
        products: basket,
      });
    } catch (error) {
      console.log("Error putting items on hold", error);
    }
  };

  const clearBasket = () => {
    //TODO: CLEAR BASKET
  };

  React.useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3001/makeapost").then((response) => {
      let allProducts = response.data.products;
      let allProductsInBasket = [];

      allProducts.map((product) => {
        if (product.basket && product.basket.includes(currentUserId)) {
          allProductsInBasket.push(product);
        } //checks if user has product in basket from the product basket object
      });
      setBasket(allProductsInBasket);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
      <Button onClick={() => handleAddItemsOnHold()}>
        Put These Items on Hold!
      </Button>
    </div>
  ) : (
    <p className="empty-basket">
      There seems to be no items in your basket. Check out the market to see
      what your neighbors are sharing!
    </p>
  );
}

//TODO: WHEN CLICK ON HOLD, handle add item on hold, handle remove item on hold, that way when checking to add products will just remove from market, add on hold by

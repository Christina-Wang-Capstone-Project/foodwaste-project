import * as React from "react";
import axios from "axios";
import "./Basket.css";
import BasketCard from "../BasketCard/BasketCard";
import { Button } from "evergreen-ui";
import Loading from "../Loading/Loading";

export default function Basket({ currentUser, basket, setBasket }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const ADD_TO_BASKET_URL = `http://localhost:3001/home/addtobasket`;
  const REMOVE_FROM_BASKET_URL = "http://localhost:3001/home/removefrombasket";
  const ON_HOLD_URL = "http://localhost:3001/home/onhold";

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(ADD_TO_BASKET_URL)
      .then((response) => {
        let allProductsInBasket = response.data.productsInBasket;
        setBasket(allProductsInBasket);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRemoveItemFromBasket = (product, quantity) => {
    setIsLoading(true);
    let tempBasket = [...basket];
    tempBasket = tempBasket.filter((item) => item.product !== product);
    setBasket(tempBasket);
    try {
      axios.post(REMOVE_FROM_BASKET_URL, {
        productId: product.objectId,
        quantity: quantity,
      });
    } catch (error) {
      res.status(400).send(error);
    }
    setIsLoading(false);
  };

  const handleAddItemsOnHold = () => {
    try {
      axios.post(ON_HOLD_URL, {
        currentUserId: currentUser.objectId,
      });
    } catch (error) {
      res.status(400).send(error);
    }
    clearBasket();
  };

  const clearBasket = () => {
    setBasket();
  };

  if (isLoading) {
    return <Loading />;
  }

  return basket != null && basket.length > 0 ? (
    <div className="basket-container">
      <div className="basket-title">Basket</div>
      {basket.map((product) => {
        return (
          <div key={product.product.objectId} className="basket-container">
            <BasketCard
              product={product.product}
              handleRemoveItemFromBasket={handleRemoveItemFromBasket}
              quantity={product.basketQuantity}
            />
          </div>
        );
      })}
      <Button onClick={() => handleAddItemsOnHold()}>
        Check These Items Out!
      </Button>
    </div>
  ) : (
    <p className="empty-basket">
      There seems to be no items in your basket. Check out the market to see
      what your neighbors are sharing!
    </p>
  );
}

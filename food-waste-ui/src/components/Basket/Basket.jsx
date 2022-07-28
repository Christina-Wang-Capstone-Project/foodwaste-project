import * as React from "react";
import axios from "axios";
import "./Basket.css";
import BasketCard from "../BasketCard/BasketCard";
import { Button, Pane, Spinner } from "evergreen-ui";
import Loading from "../Loading/Loading";

export default function Basket({ currentUser }) {
  const [basket, setBasket] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3001/home/addtobasket").then((response) => {
      let allProductsInBasket = response.data.productsInBasket;
      setBasket(allProductsInBasket);
      setIsLoading(false);
    });
  }, []);

  const handleRemoveItemFromBasket = (product) => {
    let tempBasket = [...basket]; //makes a deep copy of basket
    tempBasket = tempBasket.filter((item) => item !== product);
    setBasket(tempBasket);
    try {
      axios.post("http://localhost:3001/home/removefrombasket", {
        productId: product.objectId,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  };

  //TODO: add items on hold

  const clearBasket = () => {
    //TODO: CLEAR BASKET
  };

  if (isLoading) {
    return <Loading />;
  }

  return basket != null && basket.length > 0 ? (
    <div className="basket-container">
      {basket.map((product) => {
        return (
          <div className="basket-container">
            <BasketCard
              key={product.objectId}
              product={product}
              handleRemoveItemFromBasket={handleRemoveItemFromBasket}
            />
          </div>
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

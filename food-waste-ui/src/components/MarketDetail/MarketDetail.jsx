import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Map from "../Map/Map";
import Loading from "../Loading/Loading";
import { Button } from "evergreen-ui";
import "./MarketDetail.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { formatDate } from "../../constants/formatDate";

("use strict");

export default function MarketDetail({
  currentUserLocationOnLogin,
  handleAddToBasket,
  currentUser,
}) {
  const [curProduct, setCurProduct] = React.useState(null);
  let { objectId } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [productDetailDestination, setProductDetailDescription] =
    React.useState(null);
  const [count, setCount] = React.useState(1);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_HOME_URL}/${objectId}`)
      .then((response) => {
        setCurProduct([response.data.product]);
        setProductDetailDescription(response.data.product.location);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="product-detail">
      {curProduct && !isLoading && (
        <>
          <div className="marketdetail-product-card ">
            <img
              className="product-image"
              src={curProduct[0].file.url}
              alt={curProduct[0].objectId}
            />

            <div className="description-button-wrapper">
              <div className="product-text-container">
                <div className="product-name">{curProduct[0].name}</div>
                <div className="product-description">
                  {curProduct[0].description}
                </div>
                <div className="product-quantity">
                  In Stock: {curProduct[0].quantity}
                </div>

                <div className="quantity-container">
                  Quantity:
                  <div className="quantity-buttons">
                    <RemoveCircleOutlineIcon
                      onClick={() =>
                        setCount((prevCount) =>
                          prevCount > 2 ? prevCount - 1 : 1
                        )
                      }
                    />
                    <div className="quantity-label">{count}</div>
                    <AddCircleOutlineIcon
                      onClick={() =>
                        setCount((prevCount) =>
                          prevCount < curProduct[0].quantity
                            ? prevCount + 1
                            : curProduct[0].quantity
                        )
                      }
                    />
                  </div>
                </div>
                <div className="product-button">
                  <Button
                    onClick={() => handleAddToBasket(curProduct[0], count)}
                  >
                    Add to Basket
                  </Button>
                </div>
              </div>
            </div>
            <div className="product-dates">
              <p>Post Created on: {formatDate(curProduct[0].createdAt)}</p>
              <p> Expiration Date: {formatDate(curProduct[0].date)}</p>
            </div>
          </div>
          <div className="market-detail-map" key={curProduct.objectId}>
            <Map
              products={curProduct}
              currentUserLocationOnLogin={currentUserLocationOnLogin}
              productDetailDestination={productDetailDestination}
            />
          </div>
        </>
      )}
    </div>
  );
}

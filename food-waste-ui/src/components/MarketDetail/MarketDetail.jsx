import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Map from "../Map/Map";
import Loading from "../Loading/Loading";
import "./MarketDetail.css";

("use strict");

export default function MarketDetail({
  currentUserLocationOnLogin,
  currentUser,
}) {
  const [curProduct, setCurProduct] = React.useState(null);
  let { objectId } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [productDetailDestination, setProductDetailDescription] =
    React.useState(null);

  const URL = "http://localhost:3001/home";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${URL}/${objectId}`).then((response) => {
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
                <div className="product-quantity">{curProduct[0].quantity}</div>
              </div>
            </div>
          </div>
          <div className="market-detail-map">
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

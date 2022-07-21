import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MarketDetail.css";

("use strict");

export default function MarketDetail() {
  const [curProduct, setCurProduct] = React.useState(null);
  let { objectId } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const URL = "http://localhost:3001/home";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${URL}/${objectId}`).then((response) => {
      setCurProduct(response.data.product);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="product-detail">
      {curProduct && (
        <div className="product-card ">
          <img
            className="product-image"
            src={curProduct.file.url}
            alt={curProduct.objectId}
          />

          <div className="description-button-wrapper">
            <div className="product-text-container">
              <div className="product-name">{curProduct.name}</div>
              <div className="product-description">
                {curProduct.description}
              </div>
              <div className="product-quantity">{curProduct.quantity}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

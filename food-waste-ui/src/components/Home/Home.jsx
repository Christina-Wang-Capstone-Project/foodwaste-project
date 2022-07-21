import * as React from "react";
import "./Home.css";
import MarketGrid from "../MarketGrid/MarketGrid";
import Map from "../Map/Map";
import Hero from "../Hero/Hero";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
("use strict");

export default function Home({ products, currentUserLocationOnLogin }) {
  const [showMapView, setShowMapView] = React.useState(false);
  const [typeOfView, setTypeOfView] = React.useState("Map View");

  const handleShowMapOrProductView = () => {
    setShowMapView(!showMapView);
    setTypeOfView(showMapView ? "Map View" : "List of Products");
  };

  return (
    <>
      <div className="container">
        {!showMapView ? (
          <>
            <Hero />
            <div className="home">
              <MarketGrid products={products}></MarketGrid>
            </div>
          </>
        ) : (
          <div className="map">
            <Map
              products={products}
              currentUserLocationOnLogin={currentUserLocationOnLogin}
            />
          </div>
        )}
        <Link to="/home/map">
          <Button
            className="show-map-view-button"
            onClick={handleShowMapOrProductView}
          >
            Show {typeOfView}
          </Button>
        </Link>
      </div>
    </>
  );
}

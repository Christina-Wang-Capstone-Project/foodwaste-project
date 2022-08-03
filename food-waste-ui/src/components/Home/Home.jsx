import * as React from "react";
import "./Home.css";
import MarketGrid from "../MarketGrid/MarketGrid";
import Map from "../Map/Map";
import Hero from "../Hero/Hero";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
("use strict");

export default function Home({
  products,
  currentUserLocationOnLogin,
  currentUser,
  searchTerm,
  setDistance,
  distance,
  isLoading,
}) {
  const [showMapView, setShowMapView] = React.useState(false);
  const [typeOfView, setTypeOfView] = React.useState("Map View");
  const [mapPage, setMapPage] = React.useState("map");

  const handleShowMapOrProductView = () => {
    setShowMapView(!showMapView);
    setTypeOfView(showMapView ? "Map View" : "List of Products");
    setMapPage(showMapView ? "map" : "home");
  };

  return (
    <>
      <div className="container">
        {!showMapView ? (
          <>
            {searchTerm.length == 0 ? (
              <Hero />
            ) : (
              <div className="padding"></div>
            )}
            <div className="home">
              <MarketGrid
                products={products}
                currentUser={currentUser}
                setDistance={setDistance}
                distance={distance}
                isLoading={isLoading}
              ></MarketGrid>
            </div>
          </>
        ) : (
          <div className="home-map">
            <Map
              products={products}
              currentUserLocationOnLogin={currentUserLocationOnLogin}
            />
          </div>
        )}
        <Link to={mapPage}>
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

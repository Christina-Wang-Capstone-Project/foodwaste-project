import * as React from "react";
import "./Home.css";
import MarketGrid from "../MarketGrid/MarketGrid";
// import SearchBar from "../SearchBar/SearchBar";
import Map from "../Map/Map";
import Hero from "../Hero/Hero";
import { useEffect } from "react";
("use strict");

export default function Home({
  products,
  currentUser,
  getLocation,
  coordinates,
}) {
  return (
    <>
      <div className="container">
        <Hero />
        <Map
          currentUser={currentUser}
          products={products}
          getLocation={getLocation}
          coordinates={coordinates}
        />
        <div className="home">
          <MarketGrid products={products}></MarketGrid>
        </div>
      </div>
    </>
  );
}

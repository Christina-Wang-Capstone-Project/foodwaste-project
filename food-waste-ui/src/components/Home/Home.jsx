import * as React from "react";
import "./Home.css";
import MarketGrid from "../MarketGrid/MarketGrid";
// import SearchBar from "../SearchBar/SearchBar";
import Map from "../Map/Map";
import Hero from "../Hero/Hero";

export default function Home({ products, currentUser }) {
  return (
    <>
      <div className="container">
        <Hero />
        <Map currentUser={currentUser} />
        <div className="home">
          <MarketGrid products={products}></MarketGrid>
        </div>
      </div>
    </>
  );
}

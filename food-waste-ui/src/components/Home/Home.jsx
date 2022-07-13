import * as React from "react";
import "./Home.css";
import MarketGrid from "../MarketGrid/MarketGrid";
// import SearchBar from "../SearchBar/SearchBar";
import Hero from "../Hero/Hero";

export default function Home({ products }) {
  return (
    <>
      <Hero />
      <div className="home">
        <MarketGrid products={products}></MarketGrid>
      </div>
    </>
  );
}

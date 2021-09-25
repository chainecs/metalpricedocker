import React from "react";
import Nav from "./Nav";
import Cover from "./home/Cover";
import Footer from "./home/Footer";
import PriceHome from "./home/PriceHome";
import NewsHome from "./home/NewsHome";

function Home() {
  return (
    <div className="background">
      <Nav></Nav>
      <Cover></Cover>
      <PriceHome></PriceHome>
      <NewsHome></NewsHome>
      <Footer></Footer>
    </div>
  );
}

export default Home;

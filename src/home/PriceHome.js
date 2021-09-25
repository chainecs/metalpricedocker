import React, { useState, useEffect } from "react";
import GoldHome from "./pricehome/GoldHome";
import SilverHome from "./pricehome/SilverHome";
import PlatinumHome from "./pricehome/PlatinumHome";
import SearchPriceHome from "./pricehome/SearchPriceHome";

import "./PriceHome.css";

const axios = require("axios");

function PriceHome() {
  const [goldPrice, setGoldPrice] = useState([]);
  const [goldTimeStamp, setGoldTimeStamp] = useState([]);
  const [goldLoading, setGoldLoading] = useState(true);

  const [silverPrice, setSilverPrice] = useState([]);
  const [silverTimeStamp, setSilverTimeStamp] = useState([]);
  const [silverLoading, setSilverLoading] = useState(true);

  const [platinumPrice, setPlatinumPrice] = useState([]);
  const [platinumTimeStamp, setPlatinumTimeStamp] = useState([]);
  const [platinumLoading, setPlatinumLoading] = useState(true);

  const urlGold = "https://api.metals.live/v1/spot/gold";
  const urlSilver = "https://api.metals.live/v1/spot/silver";
  const urlPlatinum = "https://api.metals.live/v1/spot/platinum";

  const goldData = function (lastData) {
    const gp = lastData.price;
    const gt = lastData.timestamp;
    //console.log(gp);
    //console.log(gt);
    setGoldPrice(gp);
    setGoldTimeStamp(gt);
  };
  async function goldFetch() {
    axios
      .get(urlGold)
      .then(function (response) {
        const data = response.data;
        const lastData = data[data.length - 1];
        setGoldLoading(false);
        // console.log(lastData);
        return lastData;
      })
      .then(goldData)
      .catch(function (error) {
        console.error(error);
      });
  }

  const silverData = function (lastData) {
    const sp = lastData.price;
    const st = lastData.timestamp;
    //console.log(gp);
    //console.log(gt);
    setSilverPrice(sp);
    setSilverTimeStamp(st);
  };

  async function silverFetch() {
    axios
      .get(urlSilver)
      .then(function (response) {
        const data = response.data;
        const lastData = data[data.length - 1];
        setSilverLoading(false);
        // console.log(lastData);
        return lastData;
      })
      .then(silverData)
      .catch(function (error) {
        console.error(error);
      });
  }

  const platinumData = function (lastData) {
    const pp = lastData.price;
    const pt = lastData.timestamp;
    //console.log(gp);
    //console.log(gt);
    setPlatinumPrice(pp);
    setPlatinumTimeStamp(pt);
  };

  async function platinumFetch() {
    axios
      .get(urlPlatinum)
      .then(function (response) {
        const data = response.data;
        const lastData = data[data.length - 1];
        setPlatinumLoading(false);
        // console.log(lastData);
        return lastData;
      })
      .then(platinumData)
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    goldFetch();
    silverFetch();
    platinumFetch();
  }, []);

  return (
    <div className="container mt-2 w-75">
      <div className="h1 mb-3 text-white text-center">
        <h2>Price Now</h2>
        <div className="underline"></div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 mb-3  text-center">
        <GoldHome
          goldPrice={goldPrice}
          goldLoading={goldLoading}
          goldTimeStamp={goldTimeStamp}
        ></GoldHome>
        <SilverHome
          silverPrice={silverPrice}
          silverLoading={silverLoading}
          silverTimeStamp={silverTimeStamp}
        ></SilverHome>
        <PlatinumHome
          platinumPrice={platinumPrice}
          platinumLoading={platinumLoading}
          platinumTimeStamp={platinumTimeStamp}
        ></PlatinumHome>
      </div>
      <SearchPriceHome></SearchPriceHome>
    </div>
  );
}

export default PriceHome;

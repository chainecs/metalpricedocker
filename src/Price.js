import React, { useState, useEffect } from "react";

import Footer from "./home/Footer";

import { BiPlusCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const axios = require("axios");

function Price() {
  return (
    <>
      <h1 className="text-center text-white">Spot Price</h1>
      <div className="underline"></div>
      <Spot />
      <h1 className="text-center text-white">Commodities Price</h1>
      <div className="underline"></div>
      <Commodities />
      <Footer />
    </>
  );
}

function Spot() {
  const [spotData, setSpotData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.metals.live/v1/spot")
      .then(function (response) {
        const data = response.data;
        setSpotData(data);
        //console.log(data[0].gold);
        return data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="container" style={{ width: "80%" }}>
        <div className="mt-3 ">
          <div className="bd-example">
            <table className="table table-hover">
              <thead className="text-white">
                <tr>
                  <th scope="col" style={{ width: "35%" }}>
                    Metal Spots
                  </th>
                  <th scope="col" style={{ width: "35%" }}>
                    Lastest Price (USD)
                  </th>
                  <th scope="col" style={{ width: "30%" }}></th>
                </tr>
              </thead>
              <tbody>
                {spotData.map((dat, id) => {
                  const k = Object.keys(dat)[0];
                  const type = k.charAt(0).toUpperCase() + k.slice(1);
                  const price = Object.values(dat)[0];
                  if (type !== "Timestamp") {
                    return (
                      <tr key={id} className="table-dark">
                        <th scope="row">{type}</th>
                        <td>{price}</td>
                        <td className="text-info text-end">
                          <Link
                            to={{
                              pathname: `/history=${k}`,
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            History <BiPlusCircle />
                          </Link>
                        </td>
                      </tr>
                    );
                  } else {
                    const time = price;
                    let unix_timestamp = time;
                    var date = new Date(unix_timestamp);
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes();
                    var seconds = "0" + date.getSeconds();
                    var formattedTime =
                      hours +
                      ":" +
                      minutes.substr(-2) +
                      ":" +
                      seconds.substr(-2);
                    let oldDate = String(date);
                    let formattedDate = oldDate.substring(0, 10);
                    const newTime = `${formattedDate} ${formattedTime}`;

                    return (
                      <tr key={id} className="table-dark ">
                        <th scope="row"></th>
                        <td></td>
                        <td className="text-end text-secondary">
                          Last Update : {newTime}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function Commodities() {
  const [spotData, setSpotData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.metals.live/v1/spot/commodities")
      .then(function (response) {
        const data = response.data;
        setSpotData(data);
        return data;
      })
      .then(spotData)
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="container" style={{ width: "80%" }}>
      <div className="mt-3">
        <div className="bd-example">
          <table className="table table-hover">
            <thead className="text-white">
              <tr>
                <th scope="col" style={{ width: "35%" }}>
                  Commodity
                </th>
                <th scope="col" style={{ width: "35%" }}>
                  Lastest Price (USD)
                </th>
                <th scope="col" style={{ width: "30%" }}></th>
              </tr>
            </thead>
            <tbody>
              {spotData.map((dat, id) => {
                const k = Object.keys(dat)[0];
                const type = k.charAt(0).toUpperCase() + k.slice(1);

                const price = Object.values(dat)[0];
                if (type !== "Timestamp") {
                  return (
                    <tr key={id} className="table-dark ">
                      <th scope="row">{k}</th>
                      <td>{price} $</td>
                      <td className="text-info text-end">
                        <Link
                          to={{
                            pathname: `/history=${k}`,
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          History <BiPlusCircle />
                        </Link>
                      </td>
                    </tr>
                  );
                } else {
                  const time = price;
                  let unix_timestamp = time;
                  var date = new Date(unix_timestamp);
                  var hours = date.getHours();
                  var minutes = "0" + date.getMinutes();
                  var seconds = "0" + date.getSeconds();
                  var formattedTime =
                    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
                  let oldDate = String(date);
                  let formattedDate = oldDate.substring(0, 10);
                  const newTime = `Date : ${formattedDate} Time : ${formattedTime}`;

                  return (
                    <>
                      <tr key={id} className="table-dark ">
                        <th scope="row"></th>
                        <td></td>
                        <td className="text-end text-secondary">
                          Last Update : {newTime}
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Price;

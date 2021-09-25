import React, { useState } from "react";
import { data } from "./data.js";
const axios = require("axios");

function SearchPriceHome() {
  return (
    <div>
      <div className="row row-cols-1 row-cols-md-2 mb-3 ">
        <Section1></Section1>
        <Section2></Section2>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="col">
      <div className="mb-4  text-white">
        <h2 className="ml-3 text-center">Or search from List</h2>
        <div className="underline"></div>
        <ul
          className="list-unstyled mt-3"
          style={{ marginLeft: "25%", columnCount: "2" }}
        >
          {data.map((list) => {
            return (
              <li key={list.id}>
                <span>
                  <h5>
                    <span className="badge bg-light text-dark">{list.id}</span>{" "}
                    {list.metal}
                  </h5>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Section2() {
  const [metalPrice, setMetalPrice] = useState([]);
  const [metalTime, setMetalTime] = useState({ time: "", date: "" });
  const [metalShow, setMetalShow] = useState("");
  const [initial, setInitial] = useState("true");
  const [metalLoading, setMetalLoading] = useState("false");
  const [searchError, setSearchError] = useState("true");
  const [metal, setMetal] = useState([]);

  function metalData(lastData) {
    setMetalPrice(lastData.price);
    ////Time section

    let unix_timestamp = lastData.timestamp;
    var date = new Date(unix_timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    let oldDate = String(date);
    let formattedDate = oldDate.substring(0, 10);
    setMetalTime({ time: `${formattedTime}`, date: `${formattedDate}` });
    console.log("ข้อมูล", metalPrice, metalTime);

    //console.log(metalTime);
    ////Time section
  }

  async function metalFetch(url, searchError) {
    console.log("URL:", url);
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        const lastData = data[data.length - 1];
        console.log(lastData);
        setMetalLoading(false);
        setSearchError(false);
        return lastData;
      })
      .then(metalData)
      .catch(function (error) {
        console.error(error);
        console.error("Wrong URL");
        setSearchError(true);
      });
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setMetal(value.toLowerCase());
  };

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(metalPrice, metalTime);
    setInitial(false);
    const url = `https://api.metals.live/v1/spot/${metal}`; //จำไว้ๆๆ อะไรที่เป็น ตัวแปรไม่เกี่ยวกับการ return ไม่ต้องใส่ setSTATE ก็ได้!!!!!!!!!
    setMetalShow(metal.charAt(0).toUpperCase() + metal.slice(1));
    setMetalLoading(true);
    metalFetch(url);
    setMetal("");
  }

  if (initial) {
    return (
      <>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-body">
              <center>
                <div className="w-75">
                  <form className="d-flex ">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="e.g. palladium"
                      aria-label="Search"
                      id="metal"
                      name="metal"
                      value={metal}
                      onChange={handleChange}
                    ></input>
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Search
                    </button>
                  </form>
                </div>
              </center>
              <div className="pt-3 text-center">
                <h1>Type Something from lists</h1>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (metalLoading) {
    return (
      <>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-body">
              <div className="pt-3 text-center">
                <h1 className="card-title pricing-card-title">Loading</h1>
                <div
                  className="spinner-border text-secondary"
                  role="status"
                ></div>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Please Wait</li>
                  <li>fetching will </li>
                  <li>complete</li>
                  <li>in few seconds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    if (searchError === true) {
      return (
        <>
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-body">
                <center>
                  <div className="w-75">
                    <form className="d-flex ">
                      <input
                        className="form-control me-2"
                        type="text"
                        placeholder="e.g. palladium"
                        aria-label="Search"
                        id="metal"
                        name="metal"
                        value={metal}
                        onChange={handleChange}
                      ></input>
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </center>
                <div className="pt-3 text-center">
                  <h2>Wrong Keyword!!</h2>
                  <p>Please type something form lists</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-body">
              <center>
                <div className="w-75">
                  <form className="d-flex ">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="e.g. palladium"
                      aria-label="Search"
                      id="metal"
                      name="metal"
                      value={metal}
                      onChange={handleChange}
                    ></input>
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Search
                    </button>
                  </form>
                </div>
              </center>
              <div className="pt-3 text-center">
                <h1>{metalShow}</h1>
                <div className="underline" style={{ background: "gray" }}></div>
                <h1 className="card-title pricing-card-title">{metalPrice}</h1>
                <small className="text-muted fw-light h3">USD</small>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Last Updated</li>
                  <li>at</li>
                  <li>{metalTime.time}</li>
                  <li>{metalTime.date}</li>
                </ul>
                <button type="button" className="w-100 btn btn-lg btn-success">
                  Buy/Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SearchPriceHome;

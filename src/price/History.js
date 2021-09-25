import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { AiFillMinusCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Footer from "../home/Footer";
const axios = require("axios");

function History() {
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [metal, setMetal] = useState("");

  useEffect(() => {
    const sentUrl = window.location.href;
    //console.log(sentUrl.split("="),sentUrl.split("=")[0],sentUrl.split("=")[1]);
    const myMetal = sentUrl.split("=")[1];
    const url = `https://api.metals.live/v1/spot/${myMetal}`;
    setMetal(myMetal);

    function tableHandle(data) {
      let status = "";
      let nowPrice = data[0].price;
      let prevPrice = data[1].price;
      for (let i = 0; i < data.length; i++, prevPrice = nowPrice) {
        nowPrice = data[i].price;
        if (nowPrice > prevPrice) status = "up";
        if (nowPrice === prevPrice) status = "none";
        if (nowPrice < prevPrice) status = "down";
        Object.assign(data[i], { status: status });
      }
      setTableData(data.reverse());
      let price555 = [];
      let time555 = [];
      data.map((dat) => {
        const price = dat.price;
        const time = dat.timestamp;
        let unix_timestamp = time;
        var date = new Date(unix_timestamp);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime =
          hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        let oldDate = String(date);
        let formattedDate = oldDate.substring(0, 10);
        const newTime = `${formattedDate} ${formattedTime}`;
        price555.push(price);
        time555.push(newTime);
      });
      const chartPrice = price555.reverse(); //จำซะทีไอสาด setState อย่าใช้เยอะเด่วงงไอสาด
      const chartTime = time555.reverse();
      const myData = {
        labels: chartTime, // แกน X
        datasets: [
          {
            label: " Price",
            data: chartPrice, //แกน Y
            fill: true,
            backgroundColor: "#Fcc117",
            borderColor: "#37b15e",
          },
        ],
      };
      setChartData(myData);
    }

    axios
      .get(url)
      .then(function (response) {
        const res = response.data;
        let data = res.filter((a, i) => i % 10 === 0);
        return data;
      })
      .then(tableHandle)
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <p className="lead text-center">
        <Link
          to={{ pathname: "/price" }}
          className="btn btn-sm btn-secondary fw-bold border-white bg-success mt-4"
        >
          <BiArrowBack /> Back
        </Link>
      </p>
      <h1 className="title text-white text-center">
        <span className="text-info">
          {metal.charAt(0).toUpperCase() + metal.slice(1)}
        </span>{" "}
        Chart
      </h1>
      <HistoryChart chartData={chartData} />
      <HistoryTable tableData={tableData} />
      <Footer />
    </>
  );
}

function HistoryChart({ chartData }) {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="container">
      <div className="header">
        <div className="underline"></div>
      </div>
      <div className="mt-3">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

function HistoryTable({ tableData }) {
  return (
    <>
      <div className="container" style={{ width: "50%" }}>
        <div className="mt-5 ">
          <h1 className="title text-white text-center">Table</h1>
          <div className="underline"></div>
          <div className="bd-example mt-3">
            <table className="table table-hover">
              <thead className="text-white">
                <tr>
                  <th scope="col" style={{ width: "45%" }}>
                    Price (USD)
                  </th>
                  <th scope="col" style={{ width: "45%" }}>
                    Time
                  </th>
                  <th scope="col text-end" style={{ width: "10%" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((dat) => {
                  const time = dat.timestamp;
                  let unix_timestamp = time;
                  var date = new Date(unix_timestamp);
                  var hours = date.getHours();
                  var minutes = "0" + date.getMinutes();
                  var seconds = "0" + date.getSeconds();
                  var formattedTime =
                    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
                  let oldDate = String(date);
                  let formattedDate = oldDate.substring(0, 10);
                  const newTime = `${formattedDate} ${formattedTime}`;
                  function arrowSelect() {
                    if (dat.status === "up")
                      return (
                        <td className="text-success text-end">
                          <FaArrowCircleUp />
                        </td>
                      );
                    if (dat.status === "down")
                      return (
                        <td className="text-danger text-end">
                          <FaArrowCircleDown />
                        </td>
                      );
                    if (dat.status === "none")
                      return (
                        <td className="text-warning text-end">
                          <AiFillMinusCircle />
                        </td>
                      );
                  }
                  return (
                    <tr key={dat.timestamp} className="table-dark">
                      <th scope="row">{dat.price}</th>
                      <td>{newTime}</td>
                      {arrowSelect()}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function HistoryChart({ tableData }) {
  const [allPrice, setAllPrice] = useState([]);
  const [allTime, setAllTime] = useState([]);

  function chartHandle() {
    console.log("ควย");
  }
  const data = {
    labels: allTime, // แกน X
    datasets: [
      {
        label: " Price",
        data: allPrice, //แกน Y
        fill: true,
        backgroundColor: "#Fcc117",
        borderColor: "#37b15e",
      },
    ],
  };
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

  useEffect(() => {
    console.log("ข้อมูลตาราง", tableData);
    chartHandle();
    let price555 = [];
    let time555 = [];
    tableData.map((dat) => {
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
    setAllPrice(price555.reverse());
    setAllTime(time555.reverse());
    console.log("ข้อมูลกราฟ", allPrice, allTime);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title text-white">
          <span className="text-warning">Gold</span> Chart
        </h1>
        <div className="underline"></div>
      </div>

      <div className="mt-3">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default HistoryChart;

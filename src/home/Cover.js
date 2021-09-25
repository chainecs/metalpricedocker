import React from "react";
import "./Cover.css";
import { FiTrendingUp } from "react-icons/fi";
import { BsClockHistory } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";

const Cover = () => {
  return (
    <div className="container">
      <div className="d-flex w-100 h-100 text-center text-white bg-dark mt-5 square">
        <div className="cover-container d-flex p-3 mx-auto flex-column ">
          <main className="px-3">
            <h1>Metal Price Today</h1>
            <div className="underline"></div>
            <br></br>
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h1>
                    <FiTrendingUp />
                  </h1>
                  <h5 className="center">Live data</h5>

                  <p className="light">
                    When precious metals markets are open for trading, real-time
                    market data is available.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h1>
                    <MdAttachMoney />
                  </h1>
                  <h5 className="center">Last spot prices</h5>
                  <p className="light">
                    Last spot prices for gold, silver, platinum, palladium and
                    other commodities.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h1>
                    <BsClockHistory />
                  </h1>
                  <h5 className="center">Historic data</h5>
                  <p className="light">
                    Historic data currently available for all supported metal
                    types for the last ≈24 hours.
                  </p>
                </div>
              </div>
            </div>
            <img src="ingot.png" height="200" alt="gold"></img>
            <p className="lead">
              <a
                href="#"
                className="btn btn-lg btn-secondary fw-bold border-white bg-success mt-4"
              >
                Register
              </a>
            </p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Cover;

import React from "react";

function GoldHome({ goldPrice, goldLoading, goldTimeStamp }) {
  ////Time section
  let unix_timestamp = goldTimeStamp;
  var date = new Date(unix_timestamp);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  let oldDate = String(date);
  let formattedDate = oldDate.substring(0, 10);
  ////Time section

  function goldDisplay() {
    if (goldLoading) {
      return (
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Gold</h4>
              <div className="underline-gold"></div>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">Loading</h1>
              <div className="spinner-border text-warning" role="status"></div>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Please Wait</li>
                <li>fetching will </li>
                <li>complete</li>
                <li>in few seconds</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-success">
                Buy/Sell
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Gold</h4>
              <div className="underline-gold"></div>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">{goldPrice}</h1>
              <small className="text-muted fw-light h3">USD</small>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Last Updated</li>
                <li>at</li>
                <li>{formattedDate}</li>
                <li>{formattedTime}</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-success">
                Buy/Sell
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  return <>{goldDisplay()}</>;
}

export default GoldHome;

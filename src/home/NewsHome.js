import React from "react";

function NewsHome() {
  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-md-6 ">
          <div className="row g-0 border rounded flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-white">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                World
              </strong>
              <h3 className="mb-0">Featured post</h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <a href="#" className="stretched-link">
                Continue reading
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 ">
          <div className="row g-0 border rounded flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-white">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                World
              </strong>
              <h3 className="mb-0">Featured post</h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <a href="#" className="stretched-link">
                Continue reading
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsHome;

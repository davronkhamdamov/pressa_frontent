import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex-container">
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1">
            4
          </span>
          <span className="fade-in" id="digit2">
            0
          </span>
          <span className="fade-in" id="digit3">
            4
          </span>
        </h1>
        <h3 className="fadeIn">PAGE NOT FOUND</h3>
        <Link to="/" name="button">
          Return To Home
        </Link>
      </div>
      <Link to="admin">.</Link>
    </div>
  );
};

export default PageNotFound;

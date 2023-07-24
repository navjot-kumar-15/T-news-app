import React, { Component } from "react";
import "./Spinner.css";
import loading from "../Spinner/icons8-spinner.gif";

const Spinner = () => {
  return (
    <>
      <div className="img">
        <img src={loading} alt="" style={{ width: "3vw", marginTop: "2rem" }} />
      </div>
    </>
  );
};

export default Spinner;

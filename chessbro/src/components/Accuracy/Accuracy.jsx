import React from "react";
import "./Accuracy.css";

const Accuracy = ({ PGN }) => {
  return (
    <div className="accuracy">
      <div className="accuracy-color" id="black-accuracy">
        100%
      </div>
      <a id="accuracy-heading">Accuracy</a>
      <div className="accuracy-color" id="white-accuracy">
        100%
      </div>
    </div>
  );
};

export default Accuracy;

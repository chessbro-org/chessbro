import React from "react";
import "./Accuracy.css";
const Accuracy = ({ white, black }) => {
  return (
    <div className="accuracy">
      <p className="accuracy-value white-value">{white}</p>
      <p className="accuracy-heading">Accuracy</p>
      <p className="accuracy-value black-value">{black}</p>
    </div>
  );
};

export default Accuracy;

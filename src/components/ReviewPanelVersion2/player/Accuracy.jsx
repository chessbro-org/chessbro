import React from "react";
import "./Accuracy.css";
const Accuracy = ({ white, black }) => {
  const format = (num) => {
    return num % 1 === 0 ? num : parseFloat(num.toFixed(1));
  };
  return (
    <div className="accuracy">
      <p className="accuracy-value white-value">{format(white)}</p>
      <p className="accuracy-heading">Accuracy</p>
      <p className="accuracy-value black-value">{format(black)}</p>
    </div>
  );
};

export default Accuracy;

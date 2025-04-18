import React from "react";
import "./Accuracy.css";

const Accuracy = ({ PGN }) => {
  const white = PGN.accuracy ? PGN.accuracy.white : 100;
  const black = PGN.accuracy ? PGN.accuracy.black : 100;
  const format = (num) => {
    return num % 1 === 0 ? num : parseFloat(num.toFixed(1));
  }
  
  return (
    <div className="accuracy">
      <div className="accuracy-color" id="white-accuracy">
        {format(white)}{" "}
      </div>
      <a id="accuracy-heading">Accuracy</a>
      <div className="accuracy-color" id="black-accuracy">
        {format(black)}{" "}
      </div>
    </div>
  );
};

export default Accuracy;

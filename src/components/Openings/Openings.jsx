import React from "react";

import "./Openings.css";
const Openings = ({ PGN, currentMove }) => {
  return (
    <div className="opening-info">
      <a className="opening-info-text">
        {`Opening: ${PGN.move_evaluations[currentMove].opening}`}
      </a>
    </div>
  );
};

export default Openings;

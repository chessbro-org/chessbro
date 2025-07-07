import React from "react";

import "./Openings.css";
const Openings = ({ PGN, currentMove }) => {
  return (
    <div className="opening-info">
      <img className="opening-info-image" src={"/quality_imgs/book_move.png"} />
      <a className="opening-info-text">
        {PGN.move_evaluations[currentMove].opening}
      </a>
    </div>
  );
};

export default Openings;

import React from "react";

import BookMoveImg from "../../assets/img/quality_imgs/book.png";
import "./Openings.css";
const Openings = ({ PGN, currentMove }) => {
  return (
    <div id="opening-info" className="opening-info">
      <img id="opening-info-image" src={BookMoveImg} />
      <a id="opening-info-text">{PGN.move_evaluations[currentMove].opening}</a>
    </div>
  );
};

export default Openings;

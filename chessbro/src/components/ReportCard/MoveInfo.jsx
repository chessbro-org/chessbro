import React from "react";

import BookMoveImg from "../../assets/img/quality_imgs/book.png";
import BestMoveImg from "../../assets/img/quality_imgs/best_move.png";
import ExcellentImg from "../../assets/img/quality_imgs/excellent.png";
import GoodImg from "../../assets/img/quality_imgs/good.png";
import InaccuracyImg from "../../assets/img/quality_imgs/inaccuracy.png";
import MistakeImg from "../../assets/img/quality_imgs/mistake.png";
import BlunderImg from "../../assets/img/quality_imgs/blunder.png";

import "./MoveInfo.css";

const MoveInfo = ({ PGN, currentMove }) => {
  let move = PGN.move_evaluations[currentMove].move;
  let text = "";
  if (!move) {
    text = "Starting Position";
  } else {
    const move_type = PGN.move_evaluations[currentMove].move_type;
    let move_type_text = "";
    let img = null;
    switch (move_type) {
      case "book_move":
        move_type_text = "Theory";
        img = BookMoveImg;
        break;
      case "best_move":
        move_type_text = "Best";
        img = BestMoveImg;
        break;
      case "good":
        move_type_text = "Good";
        img = GoodImg;
        break;
      case "excellent":
        move_type_text = "Excellent";
        img = ExcellentImg;
        break;
      case "inaccuracy":
        move_type_text = "an Inaccuracy";
        img = InaccuracyImg;
        break;
      case "mistake":
        move_type_text = "a Mistake";
        img = MistakeImg;
        break;
      case "blunder":
        move_type_text = "a Blunder";
        img = BlunderImg;
        break;
    }
    var image = img;
    text = `${move} is ${move_type_text}`;
  }
  return (
    <div id="move-info" className="move-info">
      <a id="move-info-text">{text}</a>
      <img id="move-info-image" src={image}></img>
    </div>
  );
};

export default MoveInfo;

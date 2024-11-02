import React from "react";

import MoveQuality from "./MoveQuality";

import BookMoveImg from "../../assets/img/quality_imgs/book.png";
import BestMoveImg from "../../assets/img/quality_imgs/best_move.png";
import ExcellentImg from "../../assets/img/quality_imgs/excellent.png";
import GoodImg from "../../assets/img/quality_imgs/good.png";
import InaccuracyImg from "../../assets/img/quality_imgs/inaccuracy.png";
import MistakeImg from "../../assets/img/quality_imgs/mistake.png";
import BlunderImg from "../../assets/img/quality_imgs/blunder.png";

import "./ReportCard.css";
const ReportCard = ({ move_numbers }) => {
  return (
    <div className="report-card">
      <ul className="move_quality_list">
        <MoveQuality
          number={move_numbers.book_move}
          name="Book Move"
          image={BookMoveImg}
        />
        <MoveQuality
          number={move_numbers.best_move}
          name="Best"
          image={BestMoveImg}
        />
        <MoveQuality
          number={move_numbers.excellent}
          name="Excellent"
          image={ExcellentImg}
        />
        <MoveQuality number={move_numbers.good} name="Good" image={GoodImg} />
        <MoveQuality
          number={move_numbers.inaccuracy}
          name="Inaccuracy"
          image={InaccuracyImg}
        />
        <MoveQuality
          name="Mistake"
          number={move_numbers.mistake}
          image={MistakeImg}
        />
        <MoveQuality
          number={move_numbers.blunder}
          name="Blunder"
          image={BlunderImg}
        />
      </ul>
    </div>
  );
};

export default ReportCard;

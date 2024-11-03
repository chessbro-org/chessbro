import React, { useState } from "react";

import ChessboardComponent from "../ChessboardComponent/ChessboardComponent";
import ReviewPanel from "../ReviewPanel/ReviewPanel";
import Controls from "../Controls/Controls";

import "./GameReview.css";
import ReportCard from "./../ReportCard/ReportCard";
import MoveInfo from "./../ReportCard/MoveInfo";

const GameReview = () => {
  const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  const [PGN, setPGN] = useState({
    number_of_move_types: {
      w: {
        best_move: "??",
        blunder: "??",
        book_move: "??",
        excellent: "??",
        good: "??",
        inaccuracy: "??",
        mistake: "??",
      },
      b: {
        best_move: "??",
        blunder: "??",
        book_move: "??",
        excellent: "??",
        good: "??",
        inaccuracy: "??",
        mistake: "??",
      },
    },
    move_evaluations: [{ fen: defaultFen }],
  });
  const [currentMove, setCurrentMove] = useState(0);
  const move_numbers = PGN.number_of_move_types;
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="game-review">
      <div className="chessboard-container">
        <ChessboardComponent
          PGN={PGN}
          currentMove={currentMove}
          flipped={flipped}
        />
      </div>
      <div className="review-panel-container">
        <ReviewPanel setPGN={setPGN} />
        <div className="report-card-container">
          <MoveInfo PGN={PGN} currentMove={currentMove} />
          <ReportCard move_numbers={move_numbers} />
        </div>
        <div className="controls-container">
          <Controls
            setCurrentMove={setCurrentMove}
            PGN={PGN}
            setFlipped={setFlipped}
          />
        </div>
      </div>
    </div>
  );
};

export default GameReview;

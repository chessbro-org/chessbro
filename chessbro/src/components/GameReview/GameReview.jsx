import React, { useState } from "react";

import ChessboardComponent from "../ChessboardComponent/ChessboardComponent";
import ReviewPanel from "../ReviewPanel/ReviewPanel";
import Controls from "../Controls/Controls";

import "./GameReview.css";

const GameReview = () => {
  const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  const [PGN, setPGN] = useState([{ fen: defaultFen }]);
  const [currentMove, setCurrentMove] = useState(0);
  return (
    <div className="game-review">
      <div className="chessboard-container">
        <ChessboardComponent PGN={PGN} currentMove={currentMove} />
      </div>
      <div className="review-panel-container">
        <ReviewPanel setPGN={setPGN} />
        <div className="controls-container">
          <Controls setCurrentMove={setCurrentMove} PGN={PGN} />
        </div>
      </div>
    </div>
  );
};

export default GameReview;

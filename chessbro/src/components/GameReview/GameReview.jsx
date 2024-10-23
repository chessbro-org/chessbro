import React from "react";
import ChessboardComponent from "../ChessboardComponent/ChessboardComponent";
import ReviewPanel from "../ReviewPanel/ReviewPanel";
import "./GameReview.css";
const GameReview = () => {
  return (
    <div className="game-review">
      <div className="chessboard-container">
        <ChessboardComponent />
      </div>
      <div className="review-panel-container">
        <ReviewPanel />
      </div>
    </div>
  );
};

export default GameReview;

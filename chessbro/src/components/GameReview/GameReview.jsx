import React from "react";
import ChessboardComponent from "../ChessboardComponent/ChessboardComponent";
import ReviewPanel from "../ReviewPanel/ReviewPanel";
import Controls from "../Controls/Controls";
import "./GameReview.css";
const GameReview = () => {
  return (
    <div className="game-review">
      <div className="chessboard-container">
        <ChessboardComponent />
      </div>
      <div className="review-panel-container">
        <ReviewPanel />
        <div className="controls-container">
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default GameReview;

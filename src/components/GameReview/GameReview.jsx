import React, { useState } from "react";

import ChessboardComponent from "../ChessboardComponent/ChessboardComponent";
import ReviewPanel from "../ReviewPanel/ReviewPanel";
import Controls from "../Controls/Controls";

import "./GameReview.css";
import ReportCard from "./../ReportCard/ReportCard";
import MoveInfo from "./../ReportCard/MoveInfo";
import EvalBar from "../EvalBar/EvalBar";
import Openings from "../Openings/Openings";
import Accuracy from "../Accuracy/Accuracy";
import Nameplate from "../Nameplate/Nameplate";

const GameReview = ({ setIsLoading }) => {
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
    move_evaluations: [{ fen: defaultFen, opening: "Starting Position" }],
    info: {
      white_player: "White",
      black_player: "Black",
      white_rating: "??",
      black_rating: "??",
    },
  });
  const [currentMove, setCurrentMove] = useState(0);
  const move_numbers = PGN.number_of_move_types;
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="game-review">
      <div className="chessboard-container">
        <div className="eval-bar-container">
          <EvalBar PGN={PGN} currentMove={currentMove} flipped={flipped} />
        </div>
        <div className="chessboard-container-90">
          <div className="nameplate-container">
            <Nameplate
              player_info={{
                name: PGN.info.black_player,
                rating: PGN.info.black_rating,
                color: "black",
              }}
            />
          </div>
          <div className="chessboard-component-container">
            <ChessboardComponent
              PGN={PGN}
              currentMove={currentMove}
              flipped={flipped}
            />
          </div>
          <div className="nameplate-container">
            <Nameplate
              player_info={{
                name: PGN.info.white_player,
                rating: PGN.info.white_rating,
                color: "white",
              }}
            />
          </div>
        </div>
      </div>

      <div className="review-panel-container">
        <ReviewPanel setPGN={setPGN} setIsLoading={setIsLoading} />
        <div className="reporter-opener-container">
          <div className="accuracy-container">
            <Accuracy PGN={PGN} />
          </div>
          <div className="report-card-container">
            <MoveInfo PGN={PGN} currentMove={currentMove} />
            <ReportCard move_numbers={move_numbers} />
          </div>
          <div className="opening-container">
            <Openings PGN={PGN} currentMove={currentMove} />
          </div>
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

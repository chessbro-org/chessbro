import React, { useState } from "react";

import ChessboardComponent from "../ChessboardComponent/ChessboardComponent";
import ReviewPanel from "../ReviewPanel/ReviewPanel";
import "./GameReview.css";
import EvalBar from "../EvalBar/EvalBar";
import Nameplate from "../Nameplate/Nameplate";
import ReviewCard from "../ReviewPanelVersion2/ReviewCard";
import ReportCard from "../ReportCard/ReportCard";
import Controls from "../Controls/Controls";

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
  const [isUnderReview, setIsUnderReview] = useState(false);
  const [reviewStarted, setReviewStarted] = useState(false);
  const [profilePics, setProfilePics] = useState([
    "/profile_pic.jpg",
    "/profile_pic.jpg",
  ]);
  return (
    <div className="game-review">
      <div>
        <Nameplate
          player_info={{
            name: !flipped ? PGN.info.black_player : PGN.info.white_player,
            rating: !flipped ? PGN.info.black_rating : PGN.info.white_rating,
            color: !flipped ? "black" : "white",
          }}
        />
        <div className="chessboard-container">
          <EvalBar PGN={PGN} currentMove={currentMove} flipped={flipped} />
          <div className="chessboard-component-container">
            <ChessboardComponent
              PGN={PGN}
              currentMove={currentMove}
              flipped={flipped}
            />
          </div>
        </div>
        <Nameplate
          player_info={{
            name: !flipped ? PGN.info.white_player : PGN.info.black_player,
            rating: !flipped ? PGN.info.white_rating : PGN.info.black_rating,
            color: !flipped ? "white" : "black",
          }}
        />
      </div>
      <div className="review-panel-container">
        {!isUnderReview && (
          <ReviewPanel
            setPGN={setPGN}
            setIsLoading={setIsLoading}
            setIsUnderReview={setIsUnderReview}
            setReviewStarted={setReviewStarted}
            setProfilePics={setProfilePics}
          />
        )}
        {isUnderReview && !reviewStarted && (
          <>
            <ReviewCard
              move_numbers={move_numbers}
              PGN={PGN}
              setReviewStarted={setReviewStarted}
              setCurrentMove={setCurrentMove}
              profilePics={profilePics}
            />
          </>
        )}
        {reviewStarted && (
          <>
            <ReportCard
              PGN={PGN}
              currentMove={currentMove}
              setCurrentMove={setCurrentMove}
              setReviewStarted={setReviewStarted}
            />
          </>
        )}
        <Controls
          setCurrentMove={setCurrentMove}
          PGN={PGN}
          setFlipped={setFlipped}
        />
      </div>
    </div>
  );
};

export default GameReview;

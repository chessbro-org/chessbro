import React from "react";
import MoveList from "../MoveList/MoveList";
import Openings from "../Openings/Openings";
import "./ReportCard.css";
const ReportCard = ({ PGN, currentMove, setCurrentMove, setReviewStarted }) => {
  return (
    <div className="card">
      <button
        onClick={() => setReviewStarted(false)}
      >
        ←
      </button>
      <MoveList
        PGN={PGN}
        setCurrentMove={setCurrentMove}
        currentMove={currentMove}
      />
      <Openings PGN={PGN} currentMove={currentMove} />
    </div>
  );
};

export default ReportCard;

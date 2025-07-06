import React from "react";
import MoveList from "../MoveList/MoveList";
import Openings from "../Openings/Openings";
import "./ReportCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ReportCard = ({ PGN, currentMove, setCurrentMove, setReviewStarted }) => {
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          width: "100%",
        }}
      >
        <button onClick={() => setReviewStarted(false)} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} color="#072434" />
        </button>
      </div>
      <Openings PGN={PGN} currentMove={currentMove} />
      <MoveList
        PGN={PGN}
        setCurrentMove={setCurrentMove}
        currentMove={currentMove}
      />
    </div>
  );
};

export default ReportCard;

import React from "react";
import "./MoveInfo.css";
const MoveInfo = ({ PGN, currentMove }) => {
  let move = PGN.move_evaluations[currentMove].move;
  let text = "";
  if (!move) {
    text = "Review your game!";
  } else {
    const move_type = PGN.move_evaluations[currentMove].move_type;
    let move_type_text = "";
    switch (move_type) {
      case "book_move":
        move_type_text = "Theory";
        break;
      case "best_move":
        move_type_text = "Best";
        break;
      case "good":
        move_type_text = "Good";
        break;
      case "excellent":
        move_type_text = "Excellent";
        break;
      case "inaccuracy":
        move_type_text = "an Inaccuracy";
        break;
      case "mistake":
        move_type_text = "a Mistake";
        break;
      case "blunder":
        move_type_text = "a Blunder";
        break;
    }
    text = `${move} is ${move_type_text}`;
  }
  return (
    <div className="move-info">
      <div className="coach-container">
        <img src="/coach.png" alt="coach's face" className="coach" />
      </div>
      <div className="info-container">
        <div className="move-quality-container">
          <img
            src={`/quality_imgs/${PGN.move_evaluations[currentMove].move_type}.png`}
            className="move_quality_img"
          />
          <p className="move-text">{text}</p>
        </div>
        {/* <div className="feedback-container"></div> */}
      </div>
    </div>
  );
};

export default MoveInfo;

import React from "react";
import "./MoveList.css";
const MoveList = ({ PGN, setCurrentMove, currentMove }) => {
  const handleClick = (move) => {
    setCurrentMove(move.move_no);
  };
  return (
    <div className="move-list">
      {PGN.move_evaluations.map((move, index) => {
        if (index == 0) return;
        if (index % 2 == 0) return;
        return (
          <div key={index} className="move">
            <p className="notation-text" style={{ cursor: "none" }}>
              {(index + 1) / 2}.
            </p>
            <div className="notation">
              <p className="notation-text" onClick={() => handleClick(move)}>
                {move.move}
              </p>
              <p className="notation-text" onClick={() => handleClick(move)}>
                {PGN?.move_evaluations[index + 1]?.move || ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoveList;

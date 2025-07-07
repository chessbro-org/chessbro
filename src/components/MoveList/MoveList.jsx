import React, { useEffect } from "react";
import "./MoveList.css";

const MoveList = ({ PGN, setCurrentMove, currentMove }) => {
  const handleClick = (move) => {
    setCurrentMove(move.move_no);
  };
  useEffect(() => {
    const container = document.querySelector(".move-list");
    const current = container?.querySelector(".current-move");
    if (container && current) {
      current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [currentMove]);

  return (
    <div className="move-list">
      {PGN.move_evaluations.map((move, index) => {
        if (index === 0 || index % 2 === 0) return null;

        const nextMove = PGN.move_evaluations[index + 1];

        return (
          <div key={index} className="move">
            <p
              className="notation-text"
              style={{ cursor: "default", textAlign: "left", margin: "1px 5px", marginRight: "20px" }}
            >
              {(index + 1) / 2}.
            </p>
            <div className="notation">
              <p
                className={`notation-text ${
                  move.move_no === currentMove ? "current-move" : ""
                }`}
                onClick={() => handleClick(move)}
              >
                {move.move}
              </p>
              {nextMove && (
                <p
                  className={`notation-text ${
                    nextMove.move_no === currentMove ? "current-move" : ""
                  }`}
                  onClick={() => handleClick(nextMove)}
                >
                  {nextMove.move}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoveList;

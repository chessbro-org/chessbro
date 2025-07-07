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
            <p className="notation-number">{(index + 1) / 2}.</p>
            <div className="notation">
              <div
                className={`notation-text ${
                  move.move_no === currentMove ? "current-move" : ""
                }`}
                onClick={() => handleClick(move)}
              >
                <img
                  src={`/quality_imgs/${move.move_type}.png`}
                  className="quality-img-list"
                />
                {move.move}
              </div>
              {nextMove && (
                <div
                  className={`notation-text ${
                    nextMove.move_no === currentMove ? "current-move" : ""
                  }`}
                  onClick={() => handleClick(nextMove)}
                >
                  <img
                    src={`/quality_imgs/${nextMove.move_type}.png`}
                    className="quality-img-list"
                  />
                  {nextMove.move}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoveList;

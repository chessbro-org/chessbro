import React from "react";
import { analyse } from "../../scripts";
const GameBox = ({ game, setPGN, setIsLoading, setIsOpen, setUsername, setDate }) => {
  return (
    <div
      className="game-box"
      onClick={() => {
        setIsLoading(true)
        analyse(game.pgn, setPGN).then(() => {
          setIsLoading(false)
          setIsOpen(false)
          setUsername("")
          setDate([])
        })

      }}
    >
      {`${game.white.username} (${game.white.rating})    vs    ${game.black.username} (${game.black.rating})`}
    </div>
  );
};

export default GameBox;

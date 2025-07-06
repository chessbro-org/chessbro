import React from "react";
import { analyse } from "../../scripts/gamereview";
import axios from "axios";

const GameBox = ({
  game,
  setPGN,
  setIsLoading,
  setIsOpen,
  setUsername,
  setDate,
  setIsUnderReview,
  setProfilePics,
}) => {
  return (
    <div
      className="game-box"
      onClick={() => {
        setIsLoading(true);
        analyse(game.pgn, setPGN, setIsUnderReview).then(async () => {
          const white_pic = (await axios.get(game.white.id)).data.avatar;
          const black_pic = (await axios.get(game.black.id)).data.avatar;
          setIsLoading(false);
          setIsOpen(false);
          setUsername("");
          setDate([]);
          setProfilePics([white_pic, black_pic]);
        });
      }}
    >
      {`${game.white.username} (${game.white.rating})    vs    ${game.black.username} (${game.black.rating})`}
    </div>
  );
};

export default GameBox;

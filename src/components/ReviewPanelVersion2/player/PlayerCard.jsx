import React from "react";
import "./PlayerCard.css";
const PlayerCard = ({ info }) => {
  const { white_player, white_rating, black_player, black_rating } = info;
  return (
    <div className="player-card">
      <div className="player-info white-info">
        <p className="player-username">{white_player}</p>
        <img src="https://picsum.photos/100" alt="" className="player-pfp" />
        <p className="player-rating">{white_rating}</p>
      </div>
      <p>VS</p>
      <div className="player-info black-info">
        <p className="player-username">{black_player}</p>
        <img src="https://picsum.photos/100" alt="" className="player-pfp" />
        <p className="player-rating">{black_rating}</p>
      </div>
    </div>
  );
};

export default PlayerCard;

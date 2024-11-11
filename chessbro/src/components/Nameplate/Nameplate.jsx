import React from "react";

import "./Nameplate.css";
const Nameplate = ({ player_info }) => {
  const player_color = player_info.color;
  const player_name = player_info.name;
  const player_rating = player_info.rating;
  return (
    <div className="nameplate" id={`${player_color}-nameplate`}>
      <a id="player-name">{player_name} - </a>
      <a id="player-rating">{player_rating}</a>
    </div>
  );
};

export default Nameplate;

import React from "react";

import "./MoveQuality.css";

const MoveQuality = ({ name, image, numberW, numberB }) => {
  return (
    <li id={name} className="move_quality_item">
      <a className="quality_value left_value">{numberW}</a>
      <a className="quality_text">
        <img src={image} className="move_quality_img" id={`${name}_image`} />
        <a id="move-info-name">{name}</a>
      </a>
      <a className="quality_value right_value">{numberB}</a>
    </li>
  );
};

export default MoveQuality;

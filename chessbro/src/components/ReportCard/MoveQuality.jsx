import React from "react";

import "./MoveQuality.css";

const MoveQuality = ({ name, image, number }) => {
  return (
    <li id={name} className="move_quality_item">
      <a className="quality_text">
        <img src={image} className="move_quality_img" id={`${name}_image`} />
        {name}
      </a>{" "}
      - <a className="quality_value">{number}</a>
    </li>
  );
};

export default MoveQuality;

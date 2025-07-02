import React from "react";
import "./MoveQuality.css";

const MoveQuality = ({ name, image, numberW, numberB }) => {
  var classnameforcolor;
  if (name == "Book Move") {
    classnameforcolor = "book-move";
  } else {
    classnameforcolor = name.toLowerCase();
  }
  return (
    <li id={name} className="move_quality_item">
      <a id="move-info-name">{name}</a>
      <div className="numbers-shi">
        <a className={`quality_value left_value ${classnameforcolor}`}>
          {numberW < 10 ? `0${numberW}` : numberW}
        </a>
        <img src={image} className="move_quality_img" id={`${name}_image`} />
        <a className={`quality_value right_value ${classnameforcolor}`}>
          {numberB < 10 ? `0${numberB}` : numberB}
        </a>
      </div>
    </li>
  );
};

export default MoveQuality;

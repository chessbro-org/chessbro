import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IndividualControl.css";

const individualControl = ({ name, fasfa }) => {
  return (
    <button className="individual_controls" id={name}>
      <FontAwesomeIcon icon={fasfa} />
    </button>
  );
};

export default individualControl;

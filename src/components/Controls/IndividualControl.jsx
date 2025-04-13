import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IndividualControl.css";

const individualControl = ({ name, fasfa, onClick }) => {
  return (
    <button className="individual_controls" id={name} onClick={onClick}>
      <FontAwesomeIcon icon={fasfa} />
    </button>
  );
};

export default individualControl;

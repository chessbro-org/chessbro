import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IndividualControl.css";

const individualControl = ({ name, onclick, fasfa }) => {
  return (
    <button className="individual_controls" id={name} onClick={onclick}>
      <FontAwesomeIcon icon={fasfa} />
    </button>
  );
};

export default individualControl;

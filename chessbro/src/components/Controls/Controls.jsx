import React from "react";
import {
  faForward,
  faBackward,
  faFloppyDisk,
  faRetweet,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";

import IndividualControl from "./IndividualControl";

import "./Controls.css";

const Controls = () => {
  return (
    <div className="controls">
      <IndividualControl name="save" fasfa={faFloppyDisk} />
      <IndividualControl name="first-move" fasfa={faFastBackward} />
      <IndividualControl name="previous" fasfa={faBackward} />
      <IndividualControl name="next" fasfa={faForward} />
      <IndividualControl name="last-move" fasfa={faFastForward} />
      <IndividualControl name="reverse" fasfa={faRetweet} />
    </div>
  );
};

export default Controls;

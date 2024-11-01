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
import {
  firstMove,
  lastMove,
  next,
  previous,
  save,
} from "../../scripts/gamecontrols";
import "./Controls.css";

const Controls = ({ setCurrentMove, PGN }) => {
  return (
    <div className="controls">
      <IndividualControl
        name="save"
        fasfa={faFloppyDisk}
        onClick={() => save(PGN)}
      />
      <IndividualControl
        name="first-move"
        fasfa={faFastBackward}
        onClick={() => firstMove(setCurrentMove)}
      />
      <IndividualControl
        name="previous"
        fasfa={faBackward}
        onClick={() => previous(setCurrentMove)}
      />
      <IndividualControl
        name="next"
        fasfa={faForward}
        onClick={() => next(setCurrentMove, PGN)}
      />
      <IndividualControl
        name="last-move"
        onClick={() => lastMove(setCurrentMove, PGN)}
        fasfa={faFastForward}
      />
      <IndividualControl name="reverse" fasfa={faRetweet} />
    </div>
  );
};

export default Controls;

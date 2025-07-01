import React, { useEffect } from "react";
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
  reverse,
  save,
} from "../../scripts/controls/controls";
import "./Controls.css";

const Controls = ({ setCurrentMove, PGN, setFlipped }) => {
  const controlMacros = (e) => {
    if (e.key === "ArrowLeft" && !(e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      previous(setCurrentMove, PGN);
    } else if (e.key === "ArrowRight" && !(e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      next(setCurrentMove, PGN);
    } else if ((e.key === "s" || e.key === "S") && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      save(PGN);
    } else if (e.key === "ArrowLeft" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      firstMove(setCurrentMove);
    } else if (e.key === "ArrowRight" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      lastMove(setCurrentMove, PGN);
    } else if ((e.key === "f" || e.key === "F") && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      reverse(setFlipped);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", controlMacros);
    return () => {
      document.removeEventListener("keydown", controlMacros);
    };
  }, []);

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
        onClick={() => previous(setCurrentMove, PGN)}
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
      <IndividualControl
        name="reverse"
        fasfa={faRetweet}
        onClick={() => {
          reverse(setFlipped);
        }}
      />
    </div>
  );
};

export default Controls;

import moveSound from "../assets/sound/move_sounds/move.mp3";
import checkmateSound from "../assets/sound/move_sounds/checkmate.mp3";
import captureSound from "../assets/sound/move_sounds/capture.mp3";
import checkSound from "../assets/sound/move_sounds/check.mp3";
import castleSound from "../assets/sound/move_sounds/castle.mp3";
import promoteSound from "../assets/sound/move_sounds/promote.mp3";

const move_played = new Audio(moveSound);
const checkmate = new Audio(checkmateSound);
const check = new Audio(checkSound);
const capture = new Audio(captureSound);
const castle = new Audio(castleSound);
const promote = new Audio(promoteSound);

const save = (PGN) => {
  const blob = new Blob([JSON.stringify(PGN, null, 4)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
};

const next = (setCurrentMove, PGN) => {
  stopAudio();
  setCurrentMove((prev) => {
    if (PGN.move_evaluations.length == prev + 1) {
      return prev;
    } else {
      const move = PGN.move_evaluations[prev + 1].move;
      playSound(move);
      return prev + 1;
    }
  });
};

const previous = (setCurrentMove, PGN) => {
  stopAudio();
  setCurrentMove((prev) => {
    if (prev == 0) {
      return prev;
    } else {
      const move = PGN.move_evaluations[prev - 1].move;
      playSound(move);
      return prev - 1;
    }
  });
};

const lastMove = (setCurrentMove, PGN) => {
  stopAudio();
  setCurrentMove((prev) => {
    if (prev === PGN.move_evaluations.length - 1) {
      return prev;
    }
    const move = PGN.move_evaluations[PGN.move_evaluations.length - 1].move;
    playSound(move);
    return PGN.move_evaluations.length - 1;
  });
};

const firstMove = (setCurrentMove) => {
  stopAudio();
  setCurrentMove((prev) => {
    if (prev === 0) {
      return prev;
    }
    move_played.play();
    return 0;
  });
};

const reverse = (e) => {};

const stopAudio = () => {
  move_played.pause();
  move_played.currentTime = 0;
  checkmate.pause();
  checkmate.currentTime = 0;
  capture.pause();
  capture.currentTime = 0;
  check.pause();
  check.currentTime = 0;
  castle.pause();
  castle.currentTime = 0;
  promote.pause();
  promote.currentTime = 0;
};

const playSound = (move) => {
  if (!move) {
    return;
  }
  if (move.charAt(move.length - 1) == "+") {
    check.play();
  } else if (move.charAt(move.length - 1) == "#") {
    checkmate.play();
  } else if (move === "O-O" || move === "O-O-O") {
    castle.play();
  } else if (move.search("x") !== -1) {
    capture.play();
  } else if (move.search("=") !== -1) {
    promote.play();
  } else {
    move_played.play();
  }
};
export { save, next, previous, lastMove, firstMove, reverse };

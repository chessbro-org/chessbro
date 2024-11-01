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
  setCurrentMove((prev) => {
    console.log(PGN.length, prev);
    if (PGN.length == prev + 1) {
      return prev;
    } else {
      const move = PGN[prev + 1].move;
      if (move[-1] == "#") {
        checkmate.play();
      } else if (move[-1] == "+") {
        check.play();
      } else {
        move_played.play();
      }
      return prev + 1;
    }
  });
};
const previous = (setCurrentMove) => {
  setCurrentMove((prev) => {
    if (prev == 0) {
      return prev;
    } else {
      return prev - 1;
    }
  });
};
const lastMove = (setCurrentMove, PGN) => {
  setCurrentMove(PGN.length - 1);
};
const firstMove = (setCurrentMove) => {
  setCurrentMove(0);
};
const reverse = (e) => {};

export { save, next, previous, lastMove, firstMove, reverse };

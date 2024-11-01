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

const save = (e) => {};
const next = (currentMove, setCurrentMove, currentPGN) => {
  if (currentPGN.length === 0 || currentPGN === null) {
    return;
  }
  setCurrentMove(() => {
    if ((currentMove === 0) | (currentMove === null)) {
      return 1;
    } else {
      return currentMove++;
    }
  });
};
const previous = (currentMove, setCurrentMove, currentPGN) => {
    if (currentPGN.length === 0 || currentPGN === null) {
      return;
    }
    setCurrentMove(() => {
      if ((currentMove === 0) | (currentMove === null)) {
        return 0;
      } else {
        return currentMove-1;
      }
    });
  };
const lastMove = (e) => {};
const firstMove = (e) => {};
const reverse = (e) => {};

export { save, next, previous, lastMove, firstMove, reverse };

var chess = new Chess();
const defaultFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const matchHeight = () => {
  const evalBar = document.getElementById("eval-bar");
  const board = document.querySelector(".board-b72b1");
  if (evalBar && board) {
    evalBar.style.height = board.offsetHeight + "px";
  }
};
matchHeight();
window.addEventListener("resize", matchHeight);

var board = Chessboard("chess-board", {
  draggable: false,
  position: "start",
});

const gameInputForm = document.getElementById("game-input-form");
gameInputForm.addEventListener("submit", (e) => handleFormSubmit(e));

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const gameInputField = document.getElementById("game-input");
  const gameInputType = document.getElementById("game-input-type");
  const input = gameInputField.value;
  const type = gameInputType.value;
  switch (type) {
    case "pgn":
      const valid = await validatePGN(input);
      if (valid) {
        // TODO plan the backend work
        // TODO make a structure/ program flow for it
        // TODO code it. in the words of somerset - "Duh." real im retarded

        console.log("Valid");
      } else {
        console.log("PGN is invalid.");
        // this is temporary
        // make an html element to display invalidity or use message etc
        // TODO complete this
      }
  }
};

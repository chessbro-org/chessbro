import validatePGN, { invalidPGN } from "./validation.js";

const review_game = async (input, type) => {
  switch (type) {
    case "pgn":
      const valid = await validatePGN(input);
      if (valid) {
        const reviewed_game = await analyse(input);
        return reviewed_game;
      } else {
        invalidPGN();
      }
  }
};
const analyse = async (input) => {
  const response = await fetch("http://127.0.0.1:5000/api/review-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pgn: input }),
  });
  const analysedGame = await response.json();
  return analysedGame;
};
export default review_game;

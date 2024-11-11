import validatePGN, { invalidPGN, showErrorMessage } from "./validation.js";
import gameLoaded from "../assets/sound/game-loaded.mp3";

const review_game = async (input, type, setPGN) => {
  switch (type) {
    case "pgn":
      const valid = await validatePGN(input);
      if (valid === "yes") {
        const reviewed_game = await analyse(input, setPGN);
      } else if (valid === "no") {
        invalidPGN();
      }
  }
};
const analyse = async (input, setPGN) => {
  try {
    const response = await fetch(
      "https://chessbro.onrender.com/api/review-game",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pgn: input }),
      }
    );
    const analysedGame = await response.json();
    setPGN(analysedGame);
    const sound = new Audio(gameLoaded);
    sound.play();
  } catch {
    showErrorMessage("Error 405 - Couldn't Connect To Server.");
  }
};
export default review_game;

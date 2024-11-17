import validatePGN, { invalidPGN, showErrorMessage } from "./validation.js";
import gameLoaded from "../assets/sound/game-loaded.mp3";

const review_game = async (
  input,
  type,
  setPGN,
  month,
  year,
  setGames,
  setIsOpen,
  setUsername
) => {
  switch (type) {
    case "pgn":
      const valid = await validatePGN(input);
      if (valid === "yes") {
        const reviewed_game = await analyse(input, setPGN);
      } else if (valid === "no") {
        invalidPGN();
      }
    case "chess.com":
      const games = await getGames(input, month, year);
      setUsername(input);
      setIsOpen(true);
      setGames(games);
  }
};
export const analyse = async (input, setPGN) => {
  try {
    const response = await fetch(
      "https://obnoxious-jyoti-daamin-c6a01a27.koyeb.app/api/review-game",
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
export const getGames = async (username, month, year) => {
  const resp = await fetch("https://obnoxious-jyoti-daamin-c6a01a27.koyeb.app/api/get-chesscom-games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, month: month, year: year }),
  });
  const games = resp.json();
  if (games) {
    return games;
  } else {
    return false;
  }
};
export default review_game;

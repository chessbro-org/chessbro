import validatePGN from "./validation.js";
import gameLoaded from "../assets/sound/game-loaded.mp3";
import showErrorMessage from "./errorMessage";
import classifyMoves, { countMoveCategories } from "./classifymoves.js";
import getEngineAnalysis from "./engine.js";
import { Chess } from "chess.js";
import getGames from "./getgames.js";

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
    case "pgn": {
      const valid = validatePGN(input);
      if (valid) {
        await analyse(input, setPGN);
      } else {
        showErrorMessage("Invalid PGN");
      }
      break;
    }
    case "chess.com": {
      const games = await getGames(input, month, year);
      setUsername(input);
      setIsOpen(true);
      setGames(games);
      break;
    }
  }
};

export const analyse = async (input, setPGN) => {
  let depth = 5;
  try {
    const FENs = getFENs(input);
    let analysis = await getEngineAnalysis(FENs, depth);
    let moves_san = [null];

    const tempChess = new Chess();
    tempChess.loadPgn(input);
    moves_san = moves_san.concat(tempChess.history());

    analysis = changeFormat(input, analysis, moves_san);
    analysis = classifyMoves(analysis);
    analysis = countMoveCategories(analysis, input);

    setPGN(analysis);
    const sound = new Audio(gameLoaded);
    sound.play();
  } catch (e) {
    showErrorMessage(e);
  }
};

const getFENs = (pgn) => {
  const chess = new Chess();
  chess.loadPgn(pgn);
  const moves = chess.history();
  const numberOfMoves = moves.length;
  chess.reset();
  const FENs = [chess.fen()];
  for (let x = 0; x <= numberOfMoves - 1; x++) {
    chess.move(moves[x]);
    FENs.push(chess.fen());
  }
  return FENs;
};

const changeFormat = (pgn, infos, moves) => {
  const chess = new Chess();
  chess.loadPgn(pgn);
  try {
    for (let counter = 0; counter < infos.length; counter++) {
      const info = infos[counter];
      const move = moves[counter];
      if (info.eval.type !== "mate") {
        info.eval.value /= 100;
      }
      if (!info.best_move) {
        info.best_move = null;
      }
      info.move = move;
    }
  } catch (e) {
    showErrorMessage(e);
  }
  return infos;
};

export default review_game;

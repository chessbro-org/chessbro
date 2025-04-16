/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import validatePGN from "./validation.js";
import { Chess } from "chess.js";
import gameLoaded from "../assets/sound/game-loaded.mp3";
import showErrorMessage from "./errorMessage";
import classifyMoves, { countMoveCategories } from "./classifymoves.js";

const STOCKFISH_URL =
  "https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js";

const extractEval = (engineMessage, depth) => {
  const depthRegex = new RegExp(`^.*info depth ${depth}\\b.*$`, "gm");
  const depthLine = engineMessage.match(depthRegex);
  if (!depthLine) {
    return "nuh uh";
  }
  const scoreRegex = /score (cp|mate) (-?\d+)/;
  const match = depthLine[0].match(scoreRegex);
  if (match) {
    return {
      type: match[1], // 'cp' or 'mate'
      value: Number(match[2]),
    };
  }
  return null; // depth found but no score
};

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
        let depth = 15;
        await analyse(input, setPGN, depth);
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

export const analyse = async (input, setPGN, depth) => {
  try {
    const FENs = getFENs(input);
    let analysis = await getEngineAnalysis(FENs, depth);
    console.log(analysis);
    let moves_san = [null];
    for (let l = 1; l <= analysis.length; l++) {
      moves_san.push(analysis[l]);
    }
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

const getEngineAnalysis = async (FENs, depth) => {
  let worker = null;

  // ! this is setting the engine up, which loads the cdn js script
  try {
    const response = await fetch(STOCKFISH_URL);
    if (!response.ok) {
      showErrorMessage(`(Error: ${response.status})`);
    }
    const engineCode = await response.text();
    const blob = new Blob([engineCode], {
      type: "application/javascript",
    });
    const blobURL = URL.createObjectURL(blob);
    worker = new Worker(blobURL);
    worker.onerror = (err) => {
      console.error(` error: ${err.message || "Unknown error"}`);
    };
    worker.postMessage("uci");
    worker.postMessage("isready");
  } catch (err) {
    console.error(`error: ${err.message || "Unknown error"}`);
  }

  // promise resolver based on keyword
  const waitForKeyword = (worker, keyword, depth) => {
    return new Promise((resolve) => {
      worker.onmessage = (event) => {
        console.log(event.data)
        if (keyword === "bestmove") {
          if (event.data.startsWith(keyword)) {
            resolve(event.data.split(" ")[1]);
          }
        } else {
          const extractedEval = extractEval(event.data, depth);
          if (extractedEval === "nuh uh") {
          } else if (extractedEval) {
            resolve(extractedEval);
          } else {
            showErrorMessage("Stockfish decided to not work ☹️");
          }
        }
      };
    });
  };

  const response = [];
  for (let count = 0; count < FENs.length; count++) {
    let bestmove = false;
    if (count !== 0) {
      worker.postMessage("position fen " + FENs[count - 1]);
      worker.postMessage("go depth " + depth.toString());
      bestmove = await waitForKeyword(worker, "bestmove");
    }
    worker.postMessage("position fen " + FENs[count]);
    worker.postMessage("go depth " + depth.toString());
    const evalValue = await waitForKeyword(
      worker,
      "depth " + depth.toString(),
      depth
    );
    // convert the best move from UCI to SAN
    if (bestmove) {
      const tempchessboard = new Chess(FENs[count - 1]);
      const move = tempchessboard.move({
        from: bestmove.slice(0, 2),
        to: bestmove.slice(2, 4),
        promotion: bestmove.length === 5 ? bestmove[4] : undefined,
      });
      bestmove = move.san;
    }
    // compile this shit frfr
    const compiled = {
      move_no: count,
      fen: FENs[count],
      best_move: bestmove,
      eval: evalValue,
    };
    response.push(compiled);
  }
  worker.terminate();
  return response;
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
  const default_fen = chess.fen();
  for (let counter = 0; counter < infos.length; counter++) {
    const info = infos[counter];
    const move = moves[counter];
    if (info.eval.type !== "mate") {
      info.eval.value /= 100;
    }
    if (!info.best_move) {
      info.best_move = null;
    } else {
      if (counter > 0) {
        chess.load(infos[counter - 1].fen);
      } else {
        chess.load(default_fen);
      }
      const move_obj = chess.move({
        from: info.best_move.slice(0, 2),
        to: info.best_move.slice(2, 4),
        promotion: info.best_move.length > 4 ? info.best_move[4] : undefined,
      });
      info.best_move = move_obj ? move_obj.san : null;
      chess.load(default_fen);
    }
    info.move = move;
  }

  return infos;
};

export default review_game;

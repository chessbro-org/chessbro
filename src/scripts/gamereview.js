/* eslint-disable no-unused-vars */
import validatePGN from "./validation.js";
import { Chess } from "chess.js";
import gameLoaded from "../assets/sound/game-loaded.mp3";
import showErrorMessage from "./errorMessage";

const STOCKFISH_URL =
  "https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js";

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
  try {
    const FENs = getFENs(input);
    const analysis = await getEngineAnalysis(FENs);
    const sound = new Audio(gameLoaded);
    sound.play();
  } catch (e) {
    showErrorMessage(e);
  }
};

const getEngineAnalysis = async (FENs) => {
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
  const waitForKeyword = (worker, keyword) => {
    return new Promise((resolve) => {
      worker.onmessage = (event) => {
        if (event.data.startsWith(keyword)) {
          if (keyword === "bestmove") {
            resolve(event.data.split(" ")[1]);
          } else {
            const match = event.data.match(
              /Total evaluation:\s*([-+]?[0-9]*\.?[0-9]+)\s+\((white|black) side\)/
            );
            if (match) {
              const number = parseFloat(match[1]);
              resolve(number);
            } else {
              showErrorMessage("Stockfish decided to not work ☹️");
            }
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
      worker.postMessage("go depth 15");
      bestmove = await waitForKeyword(worker, "bestmove");
    }
    worker.postMessage("position fen " + FENs[count]);
    worker.postMessage("go depth 15");
    worker.postMessage("eval");
    const evalValue = await waitForKeyword(worker, "Total evaluation:");
    // convert the best move from UCI to SAN
    if (bestmove) {
      const tempchessboard = new Chess(FENs[count-1]);
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
  console.log(response);
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

// const changeFormat = (pgn, infos, moves) => {
//     game = chess.pgn.read_game(io.StringIO(pgn))
//     board = game.board()
//     default_fen = board.fen()
//     for counter, (info, move) in enumerate(zip(infos, moves)):

//         if (info['eval']['type']!='mate'):
//             info['eval']['value']/=100
//         if (not info['best_move']):
//             info['best_move'] = (None)
//         else:
//             board.set_fen(infos[counter-1]['fen'])
//             info['best_move'] = (board.san(chess.Move.from_uci(info['best_move'])))
//             board.set_fen(default_fen)
//         info['move'] = move
//     return infos
// }

// def review_game (pgn):
//     const game = chess.pgn.read_game(io.StringIO(pgn))
//     board = game.board()
//     moves = game.mainline_moves()
//     moves_fens = [board.fen()]
//     moves_san = [None]

//     for move in moves:
//         moves_san.append(board.san_and_push(move))
//         moves_fens.append(board.fen())

//     analysis = getEngineAnalysis(moves_fens)
//     analysis = changeFormat(pgn, analysis, moves_san)
//     analysis = classifyMoves(analysis)
//     analysis = countMoveCategories(analysis, pgn)
//     return analysis

export default review_game;

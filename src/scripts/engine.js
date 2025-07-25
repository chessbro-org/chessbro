import { Chess } from "chess.js";
import showErrorMessage from "./errorMessage";
import getThreads from "../utils/getThreads";

let engineMessagesForEval = [];
var count = 0;
var allMessages = [];
const chooseEngine = () => {
  // if (window.crossOriginIsolated) {
  //   return "/stockfish-17-lite.js";
  // } else {
  return typeof WebAssembly == "object"
    ? "/stockfish-17-lite-single.js"
    : "/stockfish-17-asm.js";
  // }
};
const waitForReady = (worker) => {
  return new Promise((resolve) => {
    const handler = (event) => {
      if (event.data.trim() == "readyok") {
        worker.removeEventListener("message", handler);
        resolve(true);
      }
    };
    worker.addEventListener("message", handler);
  });
};
const getEngineAnalysis = async (FENs, depth) => {
  let threads = getThreads();
  const worker = new Worker(chooseEngine());
  worker.addEventListener("error", (err) => {
    console.error(` error: ${err.message || "Unknown error"}`);
  });
  worker.postMessage("uci");
  worker.postMessage(`setoption name Threads value ${threads}`);
  const isReadyPromise = waitForReady(worker);
  worker.postMessage("isready");
  const isReady = await isReadyPromise;
  if (!isReady) {
    showErrorMessage("stockfish is not ready");
  }
  let response = [];
  let listOfBestmoves = [];
  for (count = 0; count < FENs.length; count++) {
    let bestmove = false,
      evalValue;
    // console.log(`Analyzing position ${count}`);
    if (count == FENs.length - 1) {
      worker.postMessage("position fen " + FENs[FENs.length - 1]);
      worker.postMessage("go depth " + depth.toString());
      evalValue = await waitForKeyword(
        worker,
        "eval",
        depth,
        engineMessagesForEval,
        FENs[count]
      );
    } else {
      worker.postMessage("position fen " + FENs[count]);
      worker.postMessage("go depth " + depth.toString());
      engineMessagesForEval = [];
      const reply = await waitForKeyword(
        worker,
        "bestmove and eval",
        depth,
        engineMessagesForEval,
        FENs[count]
      );
      listOfBestmoves.push(reply[0]);
      evalValue = reply[1];
      engineMessagesForEval = [];
    }

    // convert the best move from UCI to SAN
    if (listOfBestmoves[count - 1]) {
      const tempchessboard = new Chess(FENs[count - 1]);
      const move = tempchessboard.move({
        from: listOfBestmoves[count - 1].slice(0, 2),
        to: listOfBestmoves[count - 1].slice(2, 4),
        promotion:
          listOfBestmoves[count - 1].length === 5
            ? listOfBestmoves[count - 1][4]
            : undefined,
      });
      bestmove = move.san;
    } else {
      bestmove = false;
    }

    // change eval if it is draw
    const checker = new Chess(FENs[count]);
    const draw = checker.isDraw();
    if (draw) {
      evalValue = {
        type: "draw",
        value: "0",
      };
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

  // const jsonStr = JSON.stringify(allMessages, null, 2);
  // const blob = new Blob([jsonStr], { type: "application/json" });
  // const url = URL.createObjectURL(blob);

  // const a = document.createElement("a");
  // a.href = url;
  // a.download = "logs.json";
  // a.click();

  // URL.revokeObjectURL(url);
  return response;
};

const waitForKeyword = (worker, keyword, depth, engineMessagesForEval, fen) => {
  return new Promise((resolve) => {
    const handler = (event) => {
      allMessages.push(event.data);
      engineMessagesForEval.push(event.data);
      if (!event.data.startsWith("bestmove")) return;
      const extractedEval = extractEval(
        event.data,
        depth,
        engineMessagesForEval,
        fen
      );
      if (extractedEval === "nuh uh") {
        showErrorMessage("depth not reached for some reason");
        return;
      }
      worker.removeEventListener("message", handler);
      if (keyword === "eval") {
        if (extractedEval) {
          resolve(extractedEval);
        } else {
          showErrorMessage("depth reached but not found");
        }
      } else {
        const foundBestmove = event.data.split(" ")[1];
        if (extractedEval) {
          resolve([foundBestmove, extractedEval]);
        } else {
          showErrorMessage("depth reached but not found");
        }
      }
    };
    worker.addEventListener("message", handler);
  });
};

const extractEval = (engineMessage, depth, engineMessagesForEval, fen) => {
  engineMessage = engineMessagesForEval[engineMessagesForEval.length - 2];
  const depthRegex = new RegExp(`^.*info depth ${depth}\\b.*$`, "gm");
  const depthLine = engineMessage.match(depthRegex);
  if (!depthLine) {
    if (engineMessage.trim() === "info depth 0 score mate 0") {
      return {
        type: "mate",
        value: 0,
      };
    } else if (engineMessage.trim() === "info depth 0 score cp 0") {
      return {
        type: "cp",
        value: 0,
      };
    }
    return "nuh uh";
  }
  const scoreRegex = /score (cp|mate) (-?\d+)/;
  const match = depthLine[0].match(scoreRegex);
  if (match) {
    let cpOrMateValue = Number(match[2]);
    if (fen.includes(" b ")) {
      cpOrMateValue = -1 * cpOrMateValue;
    }
    return {
      type: match[1],
      value: cpOrMateValue,
    };
  }

  return null;
};

export default getEngineAnalysis;

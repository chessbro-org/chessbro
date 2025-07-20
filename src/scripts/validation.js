import { Chess } from "chess.js";

const validatePGN = (pgn) => {
  const chess = new Chess();
  try {
    chess.loadPgn(pgn);
    return true;
  } catch (e) {
    return false;
  }
};
export default validatePGN;

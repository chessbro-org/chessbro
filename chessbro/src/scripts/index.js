import validatePGN from "./validation";
const defaultFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const handleFormSubmit = async (input, type) => {
  switch (type) {
    case "pgn":
      const valid = await validatePGN(input);
      return valid;
  }
};

export default handleFormSubmit;

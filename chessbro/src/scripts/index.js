import validatePGN from "./validation";
  
const handleFormSubmit = async (input, type) => {
  switch (type) {
    case "pgn":
      const valid = await validatePGN(input);
      return valid;
  }
};

export default handleFormSubmit;

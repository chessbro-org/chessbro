const defaultFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const input = " whatever the input is ";
  const type = " what ever the input type is ";
  switch (type) {
    case "pgn":
      const valid = await validatePGN(input);
      if (valid) {
        // TODO plan the backend work
        // TODO make a structure/ program flow for it
        // TODO code it. in the words of somerset - "Duh." real im retarded

        console.log("Valid");
      } else {
        console.log("PGN is invalid.");
        // this is temporary
        // make an html element to display invalidity or use message etc
        // TODO complete this
      }
  }
};

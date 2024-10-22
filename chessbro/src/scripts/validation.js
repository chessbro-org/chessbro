const validatePGN = async (pgn) => {
  const response = await fetch("http://127.0.0.1:5000/api/validate-pgn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pgn }),
  });
  const valid = await response.json();
  return valid;
};

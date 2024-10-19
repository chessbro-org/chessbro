const validatePGN = (pgn) => {
  console.log(pgn);
  fetch('http://127.0.0.1:5000/api/validate-pgn', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pgn })
})
    .then((response) => response.json())
    .then(([valid, reason]) => {
      console.log(valid, reason);
    });
};

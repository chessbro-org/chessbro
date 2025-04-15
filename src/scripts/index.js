export const getGames = async (username, month, year) => {
  const resp = await fetch(
    "https://chessbro.daamin.hackclub.app/api/get-chesscom-games",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, month: month, year: year }),
    }
  );
  const games = resp.json();
  if (games) {
    return games;
  } else {
    return false;
  }
};

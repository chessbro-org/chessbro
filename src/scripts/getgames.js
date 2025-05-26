import axios from "axios";
const getGames = async (username, month, year) => {
  const url = `https://api.chess.com/pub/player/${username}/games/${year}/${month}`;

  const response = await axios.get(url);
  if (!(response.status === 200)) {
    return null;
  }

  const data = response.data;
  const games = data["games"];
  if (games.length === 0) {
    return false;
  }

  const gameInfoList = [];
  for (const game of games) {
    const gameInfo = {
      black: {
        username: game["black"]["username"],
        rating: game["black"]["rating"],
      },
      white: {
        username: game["white"]["username"],
        rating: game["white"]["rating"],
      },
      pgn: game["pgn"],
      username: username,
    };
    gameInfoList.push(gameInfo);
  }
  return gameInfoList;
};

export default getGames;

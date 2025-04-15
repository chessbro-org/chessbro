import axios from "axios";
export const scrape = async (username, month, year) => {
    const url = `https://api.chess.com/pub/player/${username}/games/${year}/${month}`;
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
    };
    const config = {
        headers: headers,
        validateStatus: function(status) {
            return true;
        }
    };
    const response = await axios.get(url, config);
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
            "black": {
                "username": game["black"]["username"],
                "rating": game["black"]["rating"]
            },
            "white": {
                "username": game["white"]["username"],
                "rating": game["white"]["rating"]
            },
            "pgn": game["pgn"],
            "username": username
        };
        gameInfoList.push(gameInfo);
    }
    return gameInfoList;
}

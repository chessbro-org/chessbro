/* No external dependencies are required in JavaScript */
export const player_info = (pgn) => {
  // Search for White player's name in the PGN
  let white_player_match = pgn.match(/\[White\s+"([^"]+)"/);
  // Search for Black player's name in the PGN
  let black_player_match = pgn.match(/\[Black\s+"([^"]+)"/);
  // Search for WhiteElo rating in the PGN
  let white_rating_match = pgn.match(/\[WhiteElo\s+"([^"]+)"/);
  // Search for BlackElo rating in the PGN
  let black_rating_match = pgn.match(/\[BlackElo\s+"([^"]+)"/);
  let white_player = white_player_match ? white_player_match[1] : "White";
  let black_player = black_player_match ? black_player_match[1] : "Black";
  let white_rating = white_rating_match ? white_rating_match[1] : "??";
  let black_rating = black_rating_match ? black_rating_match[1] : "??";

  let info = {
    white_player: white_player,
    white_rating: white_rating,
    black_player: black_player,
    black_rating: black_rating,
  };
  return info;
};

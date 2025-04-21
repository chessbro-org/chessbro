import re

def player_info(pgn):
    white_player = re.search(r'\[White\s+"([^"]+)"', pgn)
    black_player = re.search(r'\[Black\s+"([^"]+)"', pgn)
    white_rating = re.search(r'\[WhiteElo\s+"([^"]+)"', pgn)
    black_rating = re.search(r'\[BlackElo\s+"([^"]+)"', pgn)
    white_player = white_player.group(1) if white_player else "White"
    black_player = black_player.group(1) if black_player else "Black"
    white_rating = white_rating.group(1) if white_rating else "??"
    black_rating = black_rating.group(1) if black_rating else "??"

    info = {
        "white_player": white_player,"white_rating":  white_rating,"black_player":  black_player, "black_rating": black_rating
    }
    return info


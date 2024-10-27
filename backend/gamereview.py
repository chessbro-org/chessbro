import chess
import chess.pgn 
import io
import requests
import json
from stockfish import Stockfish
def getEngineAnalysis(FENs):
    response = []
    x = 0
    for FEN in FENs:
        API_ENDPOINT = "https://stockfish.online/api/s/v2.php"
        data = {'fen': FEN, 'depth': 10}
        r = requests.get(url=API_ENDPOINT, params=data)
        response.append(r.json())
        print(f'{x} is done')
        x+=1
    return response


def review_game (pgn):
    game = chess.pgn.read_game(io.StringIO(pgn))
    board = game.board()
    moves = game.mainline_moves()
    moves_fens = []
    for move in moves:
        board.push(move)
        moves_fens.append(board.fen())
    review = getEngineAnalysis(moves_fens)
    with open("response.json", "w", encoding="utf-8") as f:
        json.dump(review, f, ensure_ascii=False, indent=4)

review_game("""[Event "Live Chess"]
[Site "Chess.com"]
[Date "2024.09.25"]
[Round "?"]
[White "daamin_101"]
[Black "arturfraga"]
[Result "1-0"]
[TimeControl "600"]
[WhiteElo "1257"]
[BlackElo "1211"]
[Termination "daamin_101 won by checkmate"]
[ECO "D02"]
[EndTime "11:38:28 GMT+0000"]
[Link "https://www.chess.com/game/live/121002057375"]

1. d4 d5 2. Bf4 Nf6 3. e3 g6 4. Nf3 Bg7 5. c4 c6 6. Nc3 O-O 7. Be2 Be6 8. O-O
Nbd7 9. Qb3 Nb6 10. c5 Nc4 11. Qxb7 Qc8 12. Qxc8 Rfxc8 13. b3 Na5 14. Ne5 Ne4
15. Nxe4 dxe4 16. Ba6 Rd8 17. b4 Bxe5 18. Bxe5 Nc4 19. Bg3 Bd5 20. Rac1 Na3 21.
Rc3 Nb5 22. Bxb5 cxb5 23. Ra1 e6 24. a4 a6 25. a5 Bc4 26. Bc7 Rdc8 27. Bd6 Rc6
28. f3 f5 29. fxe4 fxe4 30. Ra2 Rd8 31. Rf2 Rd7 32. Rf8+ Kg7 33. Re8 Rf7 34.
Be5+ Kh6 35. Rc1 Kg5 36. Bf4+ Kg4 37. h3+ Kf5 38. g4+ Kf6 39. g5+ Kf5 40. Kg2 h5
41. gxh6 g5 42. Be5 Rh7 43. Rf8+ Kg6 44. Rf6+ Kh5 45. h4 gxh4 46. Rh1 Rxh6 47.
Rxh6+ Kxh6 48. Rxh4+ Kg5 49. Rxe4 Bd5 50. Kf3 Bxe4+ 51. Kxe4 Kg4 52. d5 exd5+
53. Kxd5 Rg6 54. e4 Kf3 55. Bd6 Rg5+ 56. e5 Ke2 57. c6 Rg4 58. c7 Rc4 59. Bc5
Kd3 60. c8=Q Kc3 61. Bd4+ Kb3 62. Qxc4+ bxc4 63. e6 Kxb4 64. e7 Kxa5 65. e8=Q
Kb4 66. Qb8+ Ka3 67. Qb2+ Ka4 68. Bc3 a5 69. Qc2+ Kb5 70. Qb2+ Ka4 71. Qa2+ Kb5
72. Qxc4+ Kb6 73. Qc6+ Ka7 74. Bd4+ Kb8 75. Be5+ Ka7 76. Qc7+ Ka6 77. Kc5 a4 78.
Qb6# 1-0""")
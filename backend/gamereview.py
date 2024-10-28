import chess
import chess.pgn 
import io
import json
from stockfish import Stockfish
import classifymoves as classify

stockfish = Stockfish(path=r"/usr/games/stockfish", depth=18, parameters={"Threads": 1, "Minimum Thinking Time": 100, "Hash": 1024, "Slow Mover": 10})

def getEngineAnalysis(FENs):
    response = []
    for count, FEN in enumerate(FENs):
        stockfish.set_fen_position(FEN)
        bestmove = stockfish.get_best_move()
        eval = stockfish.get_evaluation()
        compiled = {'move_no': count, 'fen': FEN, 'best_move': bestmove, 'eval': eval}
        response.append(compiled)
        print(count)

    return response

def changeFormat(pgn, infos, moves):
    game = chess.pgn.read_game(io.StringIO(pgn))
    board = game.board()
    default_fen = board.fen()
    for (info, move) in zip(infos, moves):

        if (info['eval']['type']!='mate'):
            info['eval']['value']/=100
        if (not info['best_move']):
            info['best_move'] = (None)
        else:
            board.set_fen(info['fen'])
            info['best_move'] = (board.san(chess.Move.from_uci(info['best_move'])))
            board.set_fen(default_fen)    
        info['move'] = move
    return infos

def review_game (pgn):
    game = chess.pgn.read_game(io.StringIO(pgn))
    board = game.board()
    moves = game.mainline_moves()
    moves_fens = [board.fen()]
    moves_san = [None]

    for move in moves:
        moves_san.append(board.san_and_push(move))
        moves_fens.append(board.fen())

    analysis = getEngineAnalysis(moves_fens)
    with open("1.json", "w") as file:
        json.dump(analysis, file, indent=4)
    analysis = changeFormat(pgn, analysis, moves_san)
    with open("2.json", "w") as file:
        json.dump(analysis, file, indent=4)
    analysis = classify.classifyMoves(analysis)
    with open("3.json", "w") as file:
        json.dump(analysis, file, indent=4)

def getEngineAnalysis_testing(m):
    with open("withoutmoves.json", "r") as file:
         review = json.load(file)
    return review


review_game("""[Event "Main Event"]
[Site ""]
[Date "2023.07.21"]
[Round "?"]
[White "Alireza Firouzja"]
[Black "Magnus Carlsen"]
[Result "1-0"]
[Link "https://www.chess.com/games/view/16552751"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3 Be7 5. Nc3 O-O 6. a4 d6 7. O-O Bg4 8. h3
Bxf3 9. Qxf3 Nd4 10. Qd1 c6 11. Ba2 d5 12. exd5 Nxd5 13. Ne4 f5 14. Ng3 Kh8 15.
c3 Ne6 16. Re1 Bd6 17. Qh5 Nef4 18. Qf3 Qf6 19. Bd2 Qg6 20. Rad1 Rae8 21. Bxf4
Nxf4 22. Kf1 h6 23. Bb1 Qf6 24. Nh5 Nxh5 25. Qxh5 a5 26. d4 e4 27. Re2 Bf4 28.
Ree1 g6 29. Qe2 h5 30. Kg1 h4 31. Rf1 Bc7 32. Qe3 Kg7 33. d5 Qe5 34. Qd4 Qxd4
35. Rxd4 c5 36. Rdd1 Bd6 37. Rfe1 Kf6 38. Kf1 g5 39. Ba2 Re5 40. Bc4 Rfe8 41.
Bb5 R8e7 42. Bc4 f4 43. Re2 Kf5 44. Rde1 e3 45. Bd3+ Kf6 46. Bc4 Re4 47. Bb3 c4
48. Bc2 R4e5 49. Rd1 Bc5 50. f3 Rd7 51. Be4 Rxe4 52. fxe4 Ke5 53. b3 cxb3 54.
Rb2 Kxe4 55. Ke2 Rxd5 56. Rxd5 Kxd5 57. Kd3 b6 58. Rxb3 Ke5 59. Rb2 Kd5 60. Rb1
Ke5 61. Rf1 Kf5 62. Rd1 g4 63. hxg4+ Kxg4 64. Ke2 Kg3 65. Rd5 Kxg2 66. Rg5+ Kh2
67. Kf3 h3 68. Rg4 Bd6 69. Rg6 Be5 70. c4 Bd4 71. Rg5 Bc5 72. Rg4 e2 73. Kxe2
Be3 74. Kf3 Bd2 75. Rg5 Be3 76. Rg4 Bc5 77. Rh4 Kg1 78. Rh5 Be3 79. Rg5+ Kf1 80.
Rh5 Ke1 81. Rxh3 Kd2 82. Rh4 Kc3 83. Rg4 Bc5 84. Rg5 Kxc4 85. Rf5 Kb4 86. Rg5
Kxa4 87. Rg4 Kb4 88. Rxf4+ Kb5 89. Rf5 1-0  
""")
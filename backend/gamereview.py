import chess
import chess.pgn 
import io
import json
from stockfish import Stockfish

stockfish = Stockfish(path=r"/usr/games/stockfish", depth=10, parameters={"Threads": 1, "Minimum Thinking Time": 0, "Hash": 32, "Slow Mover": 30})

def getEngineAnalysis(FENs):
    response = []
    x = 0
    for FEN in FENs:
        stockfish.set_fen_position(FEN)
        bestmove = stockfish.get_best_move()
        eval = stockfish.get_evaluation()
        compiled = {'move_no': x, 'fen': FEN, 'best_move': bestmove, 'eval': eval}
        response.append(compiled)
        x+=1
    return response

def changeFormat(pgn, infos):
    game = chess.pgn.read_game(io.StringIO(pgn))
    moves = game.mainline_moves()
    board = game.board()
    default_fen = board.fen()
    bestmoves = []

    for info in infos:
        if (not info['best_move']):
            bestmoves.append(None)
        else:
            board.set_fen(info['fen'])
            bestmoves.append(board.san(chess.Move.from_uci(info['best_move'])))
            board.set_fen(default_fen)

    with open("temp.json", "w") as file:
        json.dump(bestmoves, file, indent=4)
    for info in infos:
        info['eval']['value']/=100
    
    return infos



def classifyMoves(moves, ANALYSIS):
    pass


def review_game (pgn):
    game = chess.pgn.read_game(io.StringIO(pgn))
    board = game.board()
    moves = game.mainline_moves()
    moves_fens = [board.fen()]
    for move in moves:
        board.push(move)
        moves_fens.append(board.fen())
    analysis = getEngineAnalysis_testing(moves_fens)
    analysis = changeFormat(pgn, analysis)
    # with open("response.json", "w") as file:
    # json.dump(analysis, file, indent=4)
    classifyMoves(moves, analysis)


def getEngineAnalysis_testing(m):
    with open("response.json", "r") as file:
         review = json.load(file)
    return review


review_game("""[Event "Live Chess"]
[Site "Chess.com"]
[Date "2024.10.20"]
[Round "?"]
[White "mido_sigma"]
[Black "daamin_101"]
[Result "0-1"]
[TimeControl "600"]
[WhiteElo "800"]
[BlackElo "1224"]
[Termination "daamin_101 won by checkmate"]
[ECO "B01"]
[EndTime "12:30:03 GMT+0000"]
[Link "https://www.chess.com/game/live/123166182575"]

1. e4 d5 2. exd5 Qxd5 3. Nf3 Nc6 4. Nc3 Qa5 5. b4 Qxb4 6. Rb1 Qa5 7. Bd3 e5 8.
O-O Bg4 9. Qe1 Bxf3 10. gxf3 Nf6 11. f4 Bb4 12. fxe5 Nxe5 13. Rxb4 Qxb4 14. Bb2
Qa5 15. Ne4 Nxe4 16. Bxe4 O-O 17. Bxb7 Rab8 18. Bc3 Qb6 19. Bf3 Nxf3+ 20. Kg2
Nxe1+ 21. Rxe1 Qg6+ 22. Kf3 Qf5+ 23. Kg2 Qg4+ 24. Kf1 Rfe8 25. Rxe8+ Rxe8 26.
Bd4 Rb8 27. Bc3 Rb1# 0-1""")
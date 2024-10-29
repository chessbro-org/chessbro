import chess
import chess.pgn 
import io
import json
from stockfish import Stockfish
from classifymoves import classifyMoves

stockfish = Stockfish(path=r"/usr/games/stockfish", depth=10, parameters={"Threads": 1, "Minimum Thinking Time": 1, "Hash": 32, "Slow Mover": 10})

def getEngineAnalysis(FENs):
    response = []
    for count, FEN in enumerate(FENs):
        stockfish.set_fen_position(FEN)
        bestmove = stockfish.get_best_move()
        eval = stockfish.get_evaluation()
        compiled = {'move_no': count, 'fen': FEN, 'best_move': bestmove, 'eval': eval}
        response.append(compiled)

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
    analysis = changeFormat(pgn, analysis, moves_san)
    with open("temp.json", "w") as file:
        json.dump(analysis, file, indent=4)
    # analysis = classifyMoves(analysis)

def getEngineAnalysis_testing(m):
    with open("withoutmoves.json", "r") as file:
         review = json.load(file)
    return review



review_game("""[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
[Link "https://www.chess.com/analysis?tab=analysis"]

1. e4 f6 2. b3 g5 3. a3 a6 4. b4 b6 5. a4 c6 6. c4 Bb7 7. Bb2 Bc8 8. Ba3 Bb7 9.
Bb2 Ra7 
""")
import chess
import io
import chess.pgn
from stockfish import Stockfish
from classifymoves import classifyMoves, countMoveCategories


def getEngineAnalysis(FENs):
    stockfish = Stockfish(path=r"stockfish\stockfish-windows-x86-64-avx2.exe", depth=16, parameters={"Threads": 1, "Minimum Thinking Time": 1, "Hash": 32, "Slow Mover": 100})
    response = []
    for count, FEN in enumerate(FENs):
        if (count == 0):
            bestmove = False
        else:
            stockfish.set_fen_position(FENs[count-1])
            bestmove = stockfish.get_best_move()   

        stockfish.set_fen_position(FEN)
        eval = stockfish.get_evaluation()
        compiled = {'move_no': count, 'fen': FEN, 'best_move': bestmove, 'eval': eval}
        response.append(compiled)
        print(count)

    return response

def changeFormat(pgn, infos, moves):
    game = chess.pgn.read_game(io.StringIO(pgn))
    board = game.board()
    default_fen = board.fen()
    for counter, (info, move) in enumerate(zip(infos, moves)):

        if (info['eval']['type']!='mate'):
            info['eval']['value']/=100
        if (not info['best_move']):
            info['best_move'] = (None)
        else:
            board.set_fen(infos[counter-1]['fen'])
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
    analysis = classifyMoves(analysis)
    analysis = countMoveCategories(analysis, pgn)
    return analysis
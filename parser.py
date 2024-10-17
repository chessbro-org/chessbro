import chess.pgn
import chess

def toFEN(pgn, moveNumber=-1):
    # move number is counted as number of individual moves played
    game = chess.pgn.read_game(pgn)
    moves = game.mainline_moves()
    board = game.board()

    if moveNumber==0:
        return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    elif moveNumber>=1:
        pushed = 0
        for move in moves:
            if (pushed==moveNumber):
                break
            board.push(move)
            pushed+=1
    else:
        for move in moves:
            board.push(move)

    return board.fen()

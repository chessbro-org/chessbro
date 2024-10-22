import chess.pgn
import chess
import io

def toFEN(pgn, moveNumber=0):
    # move number is counted as number of individual moves played
    game = chess.pgn.read_game(io.StringIO(pgn))
    moves = game.mainline_moves()
    board = game.board()

    if moveNumber>=1:
        pushed = 0
        for move in moves:
            if (pushed==moveNumber):
                break
            board.push(move)
            pushed+=1

    return board.fen()
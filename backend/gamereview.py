import chess
import chess.pgn 
import io
import requests
import json
from stockfish import Stockfish

stockfish = Stockfish(path=r"/usr/games/stockfish", depth=16, parameters={"Threads": 1, "Minimum Thinking Time": 0, "Hash": 512, "Slow Mover": 30})

def getEngineAnalysis(FENs):
    response = []
    x = 1
    for FEN in FENs:
        stockfish.set_fen_position(FEN)
        bestmove = stockfish.get_best_move()
        eval = stockfish.get_evaluation()
        compiled = {'move_no': x, 'fen': FEN, 'best_move': bestmove, 'eval': eval}
        response.append(compiled)
        x+=1
    response = convertEval(response)
    return response

def convertEval(infos):
    for info in infos:
        info['eval']['value']/=100
    return infos
def review_game (pgn):
    game = chess.pgn.read_game(io.StringIO(pgn))
    board = game.board()
    moves = game.mainline_moves()
    moves_fens = []
    for move in moves:
        board.push(move)
        moves_fens.append(board.fen())
    review = getEngineAnalysis(moves_fens)
    


with open("response.json", "r") as file:
    review = json.load(file)
sigma = convertEval(review)
with open("response.json", "w") as file:
    json.dump(sigma, file, indent=4)
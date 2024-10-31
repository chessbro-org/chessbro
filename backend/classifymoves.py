import math
import json
import chess

def isBookMove(fen):
    board = chess.Board()
    board.set_fen(fen)
    fen = board.board_fen()
    with open("assets/openings/openings.json", "r") as file:
        openings = json.load(file)
    for opening in openings:
        if (opening['fen']==fen):
            return [True, opening['name']]
    return [False]

def gradeMove(eval_change):
    if (eval_change>=4.5):
        return ("blunder")
    elif (eval_change>=2.6):
        return ("mistake")
    elif (eval_change>=1.3):
        return ("inaccuracy")
    elif (eval_change>=0.8):
        return ("good")
    elif (eval_change>=0.1):
        return ("excellent")
    else:
        return ("best_move")
    
def isBestMove(move_info):
    return (move_info['best_move'] ==  move_info['move'])

def classifyMoves(analysis):
    evalDiffs= [None]
    openings = ["Starting Position"]
    
    for counter in range(1, len(analysis)): 

        current = analysis[counter]
        previous = analysis[counter-1]

        current_type = current['eval']['type']
        previous_type = previous['eval']['type']
    
        book_move = isBookMove(current['fen'])

        if (book_move[0]):
            evalDiffs.append('book_move')
            openings.append(book_move[1])
        else: 
            openings.append(None)
            if (isBestMove(current)):
                evalDiffs.append('best_move')
            elif (current_type=='cp' and previous_type=='cp'):
                resp = cp_and_cp(current, previous)
                evalDiffs.append(resp)
            elif (current_type=='cp' and previous_type=='mate'):
                resp = cp_and_mate(current, previous)
                evalDiffs.append(resp)
            elif (current_type=='mate' and previous_type=='mate'):
                resp = mate_and_mate(current, previous)
                evalDiffs.append(resp)
            elif (current_type=='mate' and previous_type=='cp'):
                resp = mate_and_cp(current, previous)
                evalDiffs.append(resp)

    for counter, (move_type, opening) in enumerate(zip(evalDiffs, openings)):
        analysis[counter]['opening'] = opening
        analysis[counter]['move_type'] = move_type

    return analysis
    
def cp_and_cp(current, previous):
    diff = previous['eval']['value'] - current['eval']['value']
    diff = math.floor(diff*100)/100
    return gradeMove(abs(diff)) 

def cp_and_mate(current, previous):
    # TODO replace the move name    
    # ! replace it with eval value
    current_eval = current['eval']['value']
    if (current_eval >= 20):
        return ("excellent")
    elif (current_eval >= 12):
        return ("good")
    elif (current_eval >= 9):
        return ("inaccuracy")
    elif (current_eval>=6):
        return ("mistake")
    else:
        return ("blunder")    

def mate_and_cp(current, previous):
    previous_eval = previous['eval']['value']
    if (previous_eval >= 30):
        return ("good")
    elif (previous_eval >= 20):
        return ("inaccuracy")
    elif (previous_eval >= 10):
        return ("mistake")
    else:
        return ("blunder")

def mate_and_mate(current, previous):
    current_mate_in = current['eval']['value']
    previous_mate_in = previous['eval']['value']
    player_color = "b" if current['move_no']%2==0 else "w"
    match player_color:
        case "w":
            if (previous_mate_in > 0):
                if (current_mate_in > 0):
                    return ("excellent")
                elif (current_mate_in < 0):
                    return ("blunder")
            elif (previous_mate_in < 0):
                return ("excellent")
        case "b":
            if (previous_mate_in < 0):
                if (current_mate_in < 0):
                    return ("excellent")
                elif (current_mate_in > 0):
                    return ("blunder")
            elif (previous_mate_in > 0):
                return ("excellent")
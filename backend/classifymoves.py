import math


def classifyMoves(analysis):
    evalDiffs= [None]
    for counter in range(1, len(analysis)): 

        current = analysis[counter]
        previous = analysis[counter-1]

        current_type = current['eval']['type']
        previous_type = previous['eval']['type']

        if (current_type=='cp' and previous_type=='cp'):
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

    return evalDiffs
    
def cp_and_cp(current, previous):
    diff = previous['eval']['value'] - current['eval']['value']
    diff = math.floor(diff*100)/100
    return abs(diff)

def cp_and_mate(current, previous):
    # TODO replace the move name    
    # ! replace it with eval value
    current_eval = current['eval']['value']
    if (current_eval >= 20):
        return ("excellent")
    elif (current_eval >= 10):
        return ("good")
    elif (current_eval >= 5):
        return ("mistake")
    else:
        return ("blunder")    

def mate_and_cp(current, previous):
    previous_eval = previous['eval']['value']
    if (previous_eval >= 30):
        return ("good")
    elif (previous_eval >= 20):
        return ("inaccuracy")
    elif (previous_eval >= 7):
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

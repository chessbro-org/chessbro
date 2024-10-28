import json
import math
from gamereview import stockfish


def classifyMoves(analysis):
    evalDiffs= []
    for counter in range(1, len(analysis)):  
        current_position = analysis[counter]['eval']
        previous_position = analysis[counter-1]['eval']
        if (current_position['type']=='cp' and previous_position['type']=='cp'):
            evalDiffs.append(_cp_and_cp(current_position, previous_position))
        elif (current_position['type']=='cp' and previous_position['type']=='mate'):
            evalDiffs.append(_cp_and_mate(current_position, previous_position))
        elif (current_position['type']=='mate' and previous_position['type']=='mate'):
            evalDiffs.append(_mate_and_mate(current_position, previous_position))
        elif (current_position['type']=='mate' and previous_position['type']=='cp'):
            evalDiffs.append(_mate_and_cp(current_position, previous_position))
    print(evalDiffs)

def _cp_and_cp(current, previous):
    diff = current['value'] - previous['value']
    diff = math.floor(diff*100)/100
    return diff

def _cp_and_mate(current, previous):
    diff = current['value'] - previous['value']
    diff = math.floor(diff*100)/100
    return diff

def _mate_and_cp(current, previous):
    print(current, previous)

def _mate_and_mate(current, previous):
    print(current, previous)

with open("withmoves.json", "r") as file:
    review = json.load(file)
    classifyMoves(review)
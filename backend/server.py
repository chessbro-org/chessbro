from flask import Flask, request, jsonify
import main 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/validate-pgn', methods=['POST'])
def validatePGN():
    pgn = request.get_json()['pgn']
    state = main.validation.validatePGN(pgn)
    return jsonify(state)
    
@app.route('/api/review-game', methods=['POST'])
def toFEN():
    pgn = request.get_json()['pgn']
    reviewed_game = main.gamereview.review_game(pgn)
    return jsonify(reviewed_game)

if __name__ == '__main__':
    app.run(debug=True)
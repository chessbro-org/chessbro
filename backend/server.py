from flask import Flask, request, jsonify
import chessbro 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/validate-pgn', methods=['POST'])
def validatePGN():
    pgn = request.get_json()['pgn']
    state = chessbro.validation.validatePGN(pgn)
    return jsonify(state)
    
@app.route('/api/review-game', methods=['POST'])
def toFEN():
    pgn = request.get_json()['pgn']
    reviewed_game = chessbro.gamereview.review_game(pgn)
    return jsonify(reviewed_game)

if __name__ == '__main__':
    app.run(debug=True)
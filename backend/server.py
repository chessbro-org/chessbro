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
    
@app.route('/api/to-fen', methods=['POST'])
def toFEN():
    pgn = request.get_json()['pgn']
    move = request.get_json()['move']
    fen = main.parser.toFEN(pgn, move)
    return jsonify(fen)


if __name__ == '__main__':
    app.run(debug=True)
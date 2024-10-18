from flask import Flask, request, jsonify
import main 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/validateMoves', methods=['GET'])
def validateMoves():
    pgn = request.args.get('pgn')
    state = main.validation.validateMoves(pgn)
    if state == 0:
        return jsonify(True)
    elif state == 1:
        return jsonify(False, "illegal")
    else:
        return jsonify(False, "format")

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify
import main 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/validate-pgn', methods=['POST'])
def validatePGN():
    pgn = request.get_json()['pgn']
    state = main.validation.validatePGN(pgn)
    if state == 0:
        return jsonify(True, None)
    elif state == 1:
        return jsonify(False, "illegal")
    else:
        return jsonify(False, "format")

if __name__ == '__main__':
    app.run(debug=True)
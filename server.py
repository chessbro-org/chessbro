from flask import Flask, request, jsonify
import main 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/validate', methods=['POST'])
def validate():
    pgn = request.args.get('pgn')
    if(main.validatePGN(pgn)):
        return jsonify(main.parser.toFEN(pgn))
    else:
        return jsonify(False)  
    


if __name__ == '__main__':
    app.run(debug=True)
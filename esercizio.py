from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dati di esempio
data = [1, 2, 3, 4, 5]

# Endpoint GET
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({
        'message': 'Dati recuperati con successo!',
        'data': data
    }), 200

# Endpoint POST
@app.route('/api/data', methods=['POST'])
def post_data():
    try:
        json_data = request.json
        if 'newValue' not in json_data:
            return jsonify({'error': 'Campo newValue mancante'}), 400

        new_value = json_data['newValue']
        if not isinstance(new_value, int):
            return jsonify({'error': 'newValue deve essere un numero intero'}), 400

        data.append(new_value)

        return jsonify({
            'message': f'Dato {new_value} aggiunto con successo!',
            'data': data
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Gestione errori generici
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint non trovato'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
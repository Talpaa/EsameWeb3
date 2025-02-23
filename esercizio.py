from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:8081"])  # Modifica l'URL se necessario

# Percorso del file JSON nella cartella "json"
JSON_PATH = os.path.join(os.path.dirname(__file__), 'json', 'task.json')

# Carica i dati dal file JSON
def load_data():
    if os.path.exists(JSON_PATH):
        with open(JSON_PATH, 'r') as file:
            return json.load(file)
    return []

# Salva i dati nel file JSON
def save_data(data):
    with open(JSON_PATH, 'w') as file:
        json.dump(data, file, indent=4)

# Endpoint per ottenere le attività
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        data = load_data()
        return jsonify({'message': 'Dati recuperati con successo!', 'data': data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint per aggiungere una nuova attività
@app.route('/api/data', methods=['POST'])
def post_data():
    try:
        json_data = request.json
        new_task = json_data.get('title')
        if not new_task:
            return jsonify({'error': 'Il campo title è obbligatorio'}), 400
        
        data = load_data()
        new_id = max([task['id'] for task in data], default=0) + 1
        new_entry = {'id': new_id, 'title': new_task, 'completed': False}
        data.append(new_entry)
        save_data(data)

        return jsonify({'message': 'Attività aggiunta con successo!', 'data': data}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint per eliminare un'attività
@app.route('/api/data/<int:task_id>', methods=['DELETE'])
def delete_data(task_id):
    try:
        data = load_data()
        data = [task for task in data if task['id'] != task_id]
        save_data(data)
        return jsonify({'message': 'Attività eliminata con successo!', 'data': data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint per aggiornare un'attività
@app.route('/api/data/<int:task_id>', methods=['PUT'])
def update_data(task_id):
    try:
        json_data = request.json
        updated_title = json_data.get('title')
        updated_completed = json_data.get('completed')

        if updated_title is None and updated_completed is None:
            return jsonify({'error': 'Almeno uno dei campi title o completed deve essere fornito'}), 400

        data = load_data()
        task = next((task for task in data if task['id'] == task_id), None)

        if task:
            # Aggiorna solo i campi forniti
            if updated_title is not None:
                task['title'] = updated_title
            if updated_completed is not None:
                task['completed'] = updated_completed
            save_data(data)
            return jsonify({'message': 'Attività aggiornata con successo!', 'data': data}), 200
        else:
            return jsonify({'error': 'Task non trovato'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Avvia il server Flask
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)

from flask import Flask, request, jsonify   #🔹 Import Flask and related modules
from flask_cors import CORS                 #🔹 Import CORS to allow frontend (React) to call backend

app = Flask(__name__)                   #🔹 Create Flask app
CORS(app)                               #🔹 Enable CORS for all routes

# 🔹 In-memory database
tasks = [
    {"id": 1, "title": "Learn React", "completed": False},
    {"id": 2, "title": "Build Project", "completed": True}
]                          #🔹 Sample tasks to start with

# 🔹 Get all tasks
@app.route('/tasks', methods=['GET'])   #👉Endpoint to get all tasks
def get_tasks():
    return jsonify(tasks)

# 🔹 Add task
@app.route('/tasks', methods=['POST'])  #👉Endpoint to add new task
def add_task():
    new_task = {
        "id": int(__import__('time').time() * 1000),
        "title": request.json.get('title'),
        "completed": False
    }
    tasks.append(new_task)
    return jsonify(new_task)

# 🔹 Delete task
@app.route('/tasks/<int:id>', methods=['DELETE'])   #👉Endpoint to delete task by ID
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task['id'] != id]
    return jsonify({"message": "Task deleted"})

# 🔹 Toggle complete
@app.route('/tasks/<int:id>', methods=['PUT'])      #👉Endpoint to toggle task completion status by ID
def update_task(id):
    for task in tasks:
        if task['id'] == id:
            task['completed'] = not task['completed']
    return jsonify({"message": "Task updated"})

# 🔹 Run server
if __name__ == '__main__':          #👉Run server if this file is executed directly
    app.run(debug=True, port=5000)  #👉Start server on port 5000
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (!title.trim()) return;
    axios.post("http://localhost:5000/tasks", { title })
      .then(res => {
        setTasks([...tasks, res.data]);
        setTitle("");
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t._id !== id)));
  };

  return (
    <div className="container">
      <h1>✨ Task Manager ✨</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty">No tasks available</p>
        ) : (
          tasks.map(task => (    // Display each task with a delete button
            <div className="task-card" key={task._id}>
              <span>{task.title}</span>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
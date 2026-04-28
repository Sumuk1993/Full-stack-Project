// server.js
const express = require("express");   // Express framework for building the server
const mongoose = require("mongoose"); // Mongoose for MongoDB interactions
const cors = require("cors");         // CORS middleware to allow cross-origin requests

const app = express();                // Create an Express application
app.use(cors());                      // Enable CORS for all routes
app.use(express.json());              // Middleware to parse JSON bodies in requests

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/tasks")// Connect to MongoDB at the specified URL and database name
  .then(() => console.log("MongoDB Connected"))    //success → "MongoDB Connected"
  .catch(err => console.log(err));

// schema
const TaskSchema = new mongoose.Schema({// Define a Mongoose schema for tasks
  title: String,                        // Title of the task
  completed: Boolean                    // Whether the task is completed or not 
});

const Task = mongoose.model("Task", TaskSchema);// Create a Mongoose model based on the Task schema

// APIs

// GET all tasks
app.get("/tasks", async (req, res) => {// Define a GET route to retrieve all tasks from the database
  const tasks = await Task.find();     // Fetch all tasks from the database
  res.json(tasks);                     // Send the tasks as a JSON response
});

// POST add task
app.post("/tasks", async (req, res) => {// Define a POST route to add a new task to the database
  const task = new Task({ title: req.body.title, completed: false });// Create a new task instance with the title from the request body and set completed to false
  await task.save();                     // Save the new task to the database
  res.json(task);                        // Send the newly created task as a JSON response
});

// PUT update task
app.put("/tasks/:id", async (req, res) => {// Define a PUT route to update an existing task by its ID
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });// Find the task by ID and update it with the data from the request body, returning the updated document
  res.json(updated);                       // Send the updated task as a JSON response
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => { // Define a DELETE route to remove a task by its ID
  await Task.findByIdAndDelete(req.params.id); // Find the task by ID and delete it from the database
  res.json({ message: "Deleted" });            // Send a JSON response indicating that the task has been deleted
});

app.listen(5000, () => console.log("Server running on port 5000"));// Start the server and listen on port 5000, logging a message to the console when the server is running

// To run the server:

// cd Redux_FullStack
// npm init -y
// npm install express mongoose cors
// node server.js
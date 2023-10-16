const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get a single task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  res.json(tasks[taskIndex]);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

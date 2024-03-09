const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Wczytaj zmienne środowiskowe (jeśli używasz)
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Podstawowa trasa
app.get('/', (req, res) => {
  res.send('Hello from ToDo App Backend!');
});

// Połączenie z MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Port na którym uruchomiony zostanie serwer
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const Todo = require('./models/todoModel');

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send('Text is required');

  try {
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).send(newTodo);
  } catch (err) {
    res.status(500).send('Error saving the todo');
  }
});


app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (err) {
    res.status(500).send('Error fetching todos');
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).send('Todo not found');
    res.send(todo);
  } catch (err) {
    res.status(500).send('Error deleting todo');
  }
});


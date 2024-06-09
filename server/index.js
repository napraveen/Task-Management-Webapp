const express = require('express');

const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const { Todo } = require('./db');

require('dotenv').config();
app.use(
  cors({
    origin: [
      'https://task-management-webapp-rho.vercel.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB is  connected successfully'))
  .catch((err) => console.error(err));

app.post('/api/addone', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const todo = new Todo({ title, description, dueDate });
    await todo.save();

    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/showall', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/api/removetodo/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    await Todo.findOneAndDelete({ _id: todoId });

    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/edittodo', async (req, res) => {
  const { id, title } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    updatedTodo.save();
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    const todos = await Todo.find();
    res.json({ todos: todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/todo/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const todo = await Todo.findOne({ title });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(4000, () => {
  console.log('Server running on 4001');
});

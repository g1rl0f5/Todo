const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();

// ✅ Use CORS config
const allowedOrigins = [
  'http://localhost:3000',
  'https://todo-ashen-beta.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test');

// ✅ Routes
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log("Server is running");
});

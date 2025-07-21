const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./models/Todo')

const app =express()
app.use(cors())
app.use(express.json())

const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',                          // for development
  'https://todo-ashen-beta.vercel.app'              // for production
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get', (req,res) => {
  TodoModel.find()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
 TodoModel.findByIdAndUpdate({_id: id}, {done: true})
 .then(result => res.json(result))
 .catch(err => res.json(err))
});


app.delete('/delete/:id' , (req,res) => {
  const {id} =  req.params;
  TodoModel.findByIdAndDelete({_id: id})
   .then(result => res.json(result))
 .catch(err => res.json(err))
})



app.post('/add', (req, res) => {
  const { task } = req.body;

  TodoModel.create({ task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
    console.log("Server is running ")
});
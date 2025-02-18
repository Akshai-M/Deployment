import express from 'express';
import bodyParser from 'body-parser'; // Correct import for body-parser
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

const FRONTEND_URL = process.env.FRONTEND_URL // Default if not in .env

app.use(cors({
    origin: FRONTEND_URL, // Use 'origin' instead of 'path'
}));
app.use(bodyParser.json()); // Use bodyParser.json()

let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        completed: false,
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        res.json(todos[todoIndex]);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((todo) => todo.id !== id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
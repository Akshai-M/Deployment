// --- Backend (server.js) ---
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL 

app.use(cors({ origin: FRONTEND_URL }));
app.use(bodyParser.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: Date.now().toString(), 
        text: req.body.text,
        completed: false,
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        res.json(todos[todoIndex]);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter((todo) => todo.id !== id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
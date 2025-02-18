import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/todos`);
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        if (newTodo.trim() === '') return;
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/todos`, { text: newTodo });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleTodo = async (id) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACK_URL}/todos/${id}`);
            setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACK_URL}/todos/${id}`);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="container">
            <h1>Todo App</h1>
            <div className="input-area">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    className="todo-input"
                />
                <button onClick={addTodo} className="add-button">Add</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            className={todo.completed ? 'todo-text completed' : 'todo-text'}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
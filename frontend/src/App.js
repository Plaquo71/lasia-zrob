import React, { useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import './App.css'; // Upewnij się, że masz ten import, jeśli używasz CSS w App.css

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text }; // Utwórz nowe zadanie z unikalnym ID i tekstem
    setTodos([...todos, newTodo]); // Dodaj nowe zadanie do listy zadań
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); // Usuń zadanie z listy
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <AddTodoForm onAdd={addTodo} /> {/* Komponent do dodawania nowych zadań */}
      <TodoList todos={todos} onRemove={removeTodo} /> {/* Lista zadań z możliwością ich usuwania */}
    </div>
  );
}

export default App;

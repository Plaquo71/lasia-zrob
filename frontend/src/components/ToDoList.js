import React from 'react';

function TodoList({ todos, onRemove }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          {todo.text}
          <button onClick={() => onRemove(todo.id)} style={{marginLeft: '10px'}}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

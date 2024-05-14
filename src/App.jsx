// import { useState } from "react";
import React, { useReducer } from "react";
import "./App.css";
import todoList from "./components/TodoList";

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });

    case "EDIT":
      return state.map((todo) => {
        return todo;
      });

    case "DELETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {delete: !todo.delete}
        }
        return todo;
      });

    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(reducer, todoList);

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  const handleEdit = (todo) => {
    dispatch({ type: "EDIT", id: todo.id });
  };

  const handleDelete = (todo) => {
    dispatch({ type: "DELETE", id: todo.id });
  };

  return (
    <div className="app">
      <div className="createTodo">
        <h1>Create A Todo List</h1>
        {/* First label of adding task  */}
        <label>
          <input type="text" placeholder="Add task" id="" />
          <button>Add</button>
        </label>
      </div>

      <div className="activeList">
        <h1>Todo List:</h1>
        {todos.map((todo) => (
          <div className="compTaskContainer" key={todo.id}>
            {/* Second label of marking the task complete */}
            <label className="compTask">
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleComplete(todo)}
              />
              Complete
            </label>
            <div className="todoContent">
              <span className="todoTitle">{todo.title}</span>
              <span className="todoTask">{todo.task}</span>
            </div>

            {/* Third label of editing task */}
            <button className="editBtn" onClick={() => handleEdit(todo)}>
              Edit
            </button>

            {/* Fourth label of deleting task */}
            <button className="deleteBtn" onClick={() => handleDelete(todo)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

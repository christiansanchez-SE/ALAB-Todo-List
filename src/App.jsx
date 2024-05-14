// import { useState } from "react";
import React, { useReducer } from "react";
import "./App.css";
import todoList from "./components/TodoList";

// reducer function that takes 2 arguments (state, action)
      // state represents the current state of the app
      // action represents the action that should be performeed to change the state
const reducer = (state, action) => {

  // The part below checks the type of action being dispatched
    // If the action type is COMPLETE, it means it will want to mark a todo item complete
  switch (action.type) {

    // Below map method is being use on the state array
      //This method iterates over each item in the array and returns a new array with the modified items
    case "COMPLETE":

      // Within the map function we are checking if the id of the current todo item matches the id of specified in the action
      return state.map((todo) => {
        if (todo.id === action.id) {

          // If the id matches its creating a new object using the spread operator ('...todo') to copy all properties of the todo item [it copies the original element and unpacks the properties]
              // Then itll toggle the complete property to its opposite value ('!todo.complete')
                  // This toggles the completion status of the todo item
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });

    case "EDIT":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, editing: !todo.editing };
        } else {
          return todo;
        }
      });

    case "DELETE":

      // state is the current list of todos
        // filter() is a function that works on arrays. It will go through each item and decides whether to keep it or delete it
          // (todo) => todo.id !== action.id is a small callback function that is applied to each item in the list
            // (todo) represents each individual item
            // todo.id !== action.id is a condition. Its expressing that if this todo item is not the same as the id that it wants to delete, then keep it
              // When state.filter is called, its going through each todo item in the list, if the id matches the id will be deleted
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
};


function App() {

  // This is a useReducer hook to manage state in my component
    // We are initalizing the todos state by calling useReducer with our reducer fuction and the inital todoList array
      // todos will hold the current state of our todo list
         // dispatch is a function that we can use to send actions to our reducer, trigger state updates
  const [todos, dispatch] = useReducer(reducer, todoList);

  // This function takes a todo object as an argument
    // When called, it dispatches an action of type "COMPLETE" to the reducer, along with the todo item that needs to be marked as complete
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

        {/* Map is being used to iterate over the todos array
          For each todo item, its returning a JSX element */}
        {todos.map((todo) => (

          // Each todo item is wrapped in a <div> element with a unique key attribute set to the todo items id
            // This is required by react for efficient rendering
          <div className="compTaskContainer" key={todo.id}>

            {/* Second label of marking the task complete */}
            {/* Within each <div> we have a <label> element containg an <input> checkbox
                The "checked" attribute of the checkbox is set to the "complete" property of the todo item
                  This ensures that the checkbox reflects the completion status of the todo item
                    The "onChange" event handler is triggered when the checkbox is clicked
                      It calls the "handleComplete" function, passing the current todo item as an argument */}
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
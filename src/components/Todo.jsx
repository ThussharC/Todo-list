import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import delete_icon from "../assets/delete_icon.png";
import warning_icon from "../assets/warning.png";
import Todoitems from "./Todoitems";
import "./Todo.css";

const Todo = () => {
  const inputRef = useRef();

  //Retaining To-Do item in Local Storage
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos")) // Todos object is parsed here
      : []
  ); //array used here to store multiple data

  //Add item function
  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(), // Used for add and deleting a particular entry
      text: inputText, // Text goes here
      isComplete: false, // Used for toggling
    };

    setTodoList((prev) => [...prev, newTodo]); // Previous entries are combined with new entries
    inputRef.current.value = ""; //Input field is made empty
  };
  // Delete item function
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id); //Checks for the todo item Id and if it matches with the ID then it will not be displayed
    });
  };
  //Toggle complete function

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete }; // Operation toggles the present state of the isComplete object
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList)); //Array is stringied for storage in the local browser
  }, [todoList]);
  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          Add
        </button>
      </div>

      <div>
        {todoList.map((item, index) => {
          return (
            <Todoitems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
      <footer>
        <img src={warning_icon} alt="" />
        <span>Warning</span>This is a private copy. Not for commerical use.
        Illegal usage will be subject to prosecution
      </footer>
    </div>
  );
};

export default Todo;

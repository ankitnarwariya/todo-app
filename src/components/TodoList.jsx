import React, { useState, useEffect, useRef } from "react";
import Todo from "./Todo";
import bg from "../assets/bg.jpg";

const TodoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedTodos = window.localStorage.getItem("todos"); //retrieve data from local storage
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setTodoInput(e.target.value);
  };

  const onPressEnterHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClickHandler();
    }
  };

  const onClickHandler = () => {
    if (todoInput.trim() !== "") {
      const newTodo = { text: todoInput, done: false };

      const updatedTodos = [...todos, newTodo];

      window.localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save in local storage

      setTodos(updatedTodos);
      setTodoInput(""); // Clear input
      inputRef.current.value = ""; // Clear input
    }
  };

  const handleRemove = (indexToRemove) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter(
        (_, index) => index !== indexToRemove
      );
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update local storage
      return updatedTodos;
    });
  };

  const handleDone = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].done = !updatedTodos[index].done;
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update local storage
      return updatedTodos;
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-300 font-sans bg-main-bg bg-cover bg-center bg-blend-darken">
      <div className="bg-white rounded shadow p-6 m-4 w-full min-h-[90vh] max-h-[90vh] overflow-auto lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest text-xl font-bold">Todo List</h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none outline-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              ref={inputRef}
              onChange={onChangeHandler}
              onKeyPress={onPressEnterHandler}
            />
            <button
              className="flex-no-shrink px-6 py-2 rounded text-white font-bold uppercase bg-teal-800 active:scale-95"
              onClick={onClickHandler}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <div className="max-h-[66vh] overflow-auto">
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo.text}
                onRemove={() => handleRemove(index)}
                onDone={() => handleDone(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

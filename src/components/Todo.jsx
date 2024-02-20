import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ todo, onRemove, onDone }) => {
  const [isDone, setIsDone] = useState(false);

  const handleDoneClick = () => {
    setIsDone(!isDone);
    onDone();
  };
  return (
    <div className={`flex mb-4 items-center ${isDone ? "done" : ""}`}>
      <p className={`w-full text-grey-darkest ${isDone ? "line-through" : ""}`}>
        {todo}
      </p>
      <button
        className="flex-no-shrink px-4 py-2 ml-4 mr-1 rounded text-white bg-green-800 active:scale-95"
        onClick={handleDoneClick}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button
        className="flex-no-shrink px-4 py-2 ml-1 rounded text-red bg-red-800 text-white active:scale-95 "
        onClick={onRemove}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default Todo;

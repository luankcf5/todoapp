import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList, handleCheckClick }) {
  return (
    <div>
      {todoList.map((todo) => (
        <Todo handleCheckClick={handleCheckClick} key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

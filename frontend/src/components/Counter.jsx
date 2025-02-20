import React from "react";
import { useSelector } from "react-redux";

function Counter() {
  const todoCount = useSelector((state) => state.todos);
  // console.log(todoCount.todos.length);

  return <p className="p-1">{todoCount.todos.length}</p>;
}

export default Counter;

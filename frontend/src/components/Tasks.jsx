import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import Counter from "./Counter";
import DisplayTodo from "./DisplayTodo";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import PopUp from "./PopUp";
import InfoBox from "./InfoBox";
function Tasks() {
  // Get the current user that is logged in and set it to loggedInUser
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("user"));
  }, []);

  // ---------------------------------------------------------------------
  // Accessing Global state from store
  const myTodos = useSelector((state) => state.todos.todos);

  // ------------------------------------------------------------------------
  const navigate = useNavigate();
  // ------------------------------------------------------------------------
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("mail address");
    handleSuccess("Logging off...");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  // ------------------------------------------------------------------------
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-between">
        <button
          type="button"
          className="ml-4 text-2xl text-gray-300 font-bold rounded p-2"
          onClick={handleLogout}
        >
          logout
        </button>
        <h1 className="text-2xl text-gray-300 font-semibold  mr-4 p-2">
          Welcome {loggedInUser}
        </h1>
      </div>

      <div className="flex items-center justify-center">
        <Card />
      </div>
      <h2 className="text-3xl text-gray-300   font-semibold  flex items-center justify-center p-3">
        Tasks: <Counter />
      </h2>

      <ul className="w-full max-h-80 overflow-y-scroll">
        {myTodos.map((todo) => (
          <li
            className="mb-1 w-full flex justify-center items-center"
            key={todo.id}
          >
            <DisplayTodo
              isComplete={todo.complete}
              id={todo.id}
              description={todo.description}
              title={todo.title}
            />
          </li>
        ))}
      </ul>
      <InfoBox />
      <PopUp />
      <ToastContainer />
    </div>
  );
}

export default Tasks;

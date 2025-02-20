import React from "react";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useDispatch } from "react-redux";
import { toggleModal } from "../store/features/popUpModal/showModalSlice";
import { toggleInfo } from "../store/features/info/infoSlice";
import { todoAdded } from "../store/features/todo/todoSlice";
import { nanoid } from "@reduxjs/toolkit";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";

// consuming the global state with this custom hook

function AddTodoForm() {
  const isValid = useSelector((state) => state.todos.error);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (/^\s*$/.test(title, description)) {
      setTitle("");
      setDescription("");
      dispatch(toggleModal(true));

      return;
    } else {
      dispatch(
        todoAdded({
          id: nanoid(),
          title: title,
          description: description,
        })
      );

      if (!isValid) {
        handleSuccess("Task added successfully");
      } else {
        handleError("Task exceeds 140 characters");
      }

      setTitle("");
      setDescription("");
    }
  };
  // -------------------------------------------------------------------------
  function showInfo() {
    dispatch(toggleInfo(true));
    return;
  }
  return (
    <>
      <div className="flex justify-between">
        <BsFillInfoCircleFill
          className="cursor-pointer  text-white hover:text-emerald-400"
          onClick={() => {
            showInfo();
          }}
          size={20}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full  flex items-center justify-center "
      >
        <div className=" ">
          <input
            type="text"
            className="mb-2 w-full text-sm text-slate-600 bg-white border border-slate-300 appearance-none rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            id="name"
            name="title"
            placeholder="Title:"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>

          <textarea
            className="w-full text-slate-600 bg-white border border-slate-300 appearance-none rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            name="message"
            id="message"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description:"
            value={description}
            required
          ></textarea>
          <button className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group">
            Add Task{" "}
            <span className="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
              -&gt;
            </span>
          </button>
        </div>
      </form>
    </>
  );
}

export default AddTodoForm;

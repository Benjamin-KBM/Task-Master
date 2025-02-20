import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoUpdated } from "../store/features/todo/todoSlice";
import { toggleInfo } from "../store/features/info/infoSlice";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";

function UpdateTodoForm() {
  const todoToUpdate = useSelector((state) => state.todos.todoUpdate);

  const dispatch = useDispatch();
  const [title, setTitle] = useState(todoToUpdate.title);
  const [description, setDescription] = useState(todoToUpdate.description);
  // Handle form update
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    // Regex to catch empty inbox
    if (/^\s*$/.test(title, description)) {
      setTitle("");
      setDescription("");
      dispatch(toggleModal(true));
      return;
      z;
    } else {
      dispatch(
        todoUpdated({
          id: todoToUpdate.id,
          title: title,
          description: description,
        })
      );
      setTitle("");
      setDescription("");
    }
  };
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
        onSubmit={handleSubmitUpdate}
        className="w-full  flex items-center justify-center "
      >
        <div className=" ">
          <input
            type="text"
            className="mb-2 w-full text-sm text-slate-600 bg-white border border-slate-300 appearance-none rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Title:"
            required
          ></input>

          <textarea
            className="w-full text-slate-600 bg-white border border-slate-300 appearance-none rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            value={description}
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description:"
            required
          ></textarea>
          <button className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group">
            Update Task{" "}
            <span className="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
              -&gt;
            </span>
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateTodoForm;

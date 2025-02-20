import React from "react";
import { BsTrashFill, BsCheckSquare } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import {
  todoComplete,
  todoDeleted,
  toggleForm,
} from "../store/features/todo/todoSlice";
import { useDispatch } from "react-redux";

const DisplayTodo = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="w-1/2 h-full min-h-max  shadow-2xl rounded-lg p-2 items flex flex-col space-y-10 justify-between bg-sky-500/50 ">
      <div className="flex flex-col space-y-10 w-full h-full min-h-max p-4 ">
        <div className="flex items-center justify-center">
          <div className=" w-full h-full flex justify-between bg-transparent rounded  ">
            <div className="px-4 ">
              <h1
                // Depending on isComplete boolean will alter class name
                className={
                  props.isComplete
                    ? "text-1xl text-gray-300 line-through  font-semibold"
                    : "text-1xl text-stone-50   font-semibold"
                }
              >
                {props.title}
              </h1>
              <h1
                // Depending on isComplete boolean will alter class name
                className={
                  props.isComplete
                    ? "text-1xl text-gray-300 line-through  font-semibold"
                    : "text-1xl text-stone-50   font-semibold"
                }
              >
                {props.description}
              </h1>
            </div>
            <div className="px-4 flex space-x-4">
              <BsCheckSquare
                onClick={() => dispatch(todoComplete(props.id))}
                className="cursor-pointer  text-white hover:text-green-400 "
                size={20}
              />
              <FaEdit
                onClick={() =>
                  dispatch(
                    toggleForm({
                      id: props.id,
                      title: props.title,
                      description: props.description,
                    })
                  )
                }
                className="cursor-pointer  text-white hover:text-yellow-400"
                size={20}
              />
              <BsTrashFill
                onClick={() => dispatch(todoDeleted(props.id))}
                className="cursor-pointer  text-white hover:text-red-500"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTodo;

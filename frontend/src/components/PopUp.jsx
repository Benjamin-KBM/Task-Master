import React from "react";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../store/features/popUpModal/showModalSlice";

function PopUp() {
  // Accessing Global state from store
  const modal = useSelector((state) => state.popUpModal);
  // Dispatching actions to update the global state
  const dispatch = useDispatch();
  if (!modal.isVisible) return null;
  return (
    <div className="fixed inset-0  bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-black-50 p-6 rounded ">
        <div
          className="text-white xl place-self-end"
          onClick={() => dispatch(toggleModal(false))}
        >
          <IoClose />
        </div>

        <h3 className="text-xl font bold text-white mb-5 flex justify-center p-6">
          Please enter valid input
        </h3>
      </div>
    </div>
  );
}

export default PopUp;

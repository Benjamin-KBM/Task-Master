import React from "react";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { toggleInfo } from "../store/features/info/infoSlice";

function InfoBox() {
  // Accessing Global state from store
  const modal = useSelector((state) => state.infoModal);
  const dispatch = useDispatch();
  if (!modal.isClicked) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex  flex-col">
        <div className="bg-sky-500/100  p-6 rounded">
          <div
            className="text-white text-xl place-self-end"
            onClick={() => dispatch(toggleInfo(false))}
          >
            <IoClose />
          </div>
          <h3 className="text-xl font bold text-white mb-5 ">info</h3>
          <p className="mb-5 font-normal text-white">
            This app is a simple todo tracker, with basic functionality. Such as
            adding, updating, and deleting tasks, with tasks stored temporarily
            in global state.
          </p>
          <p className="mb-5 font-normal text-white">
            To create a new objective, fill in the input field and click add
            submit. To delete a task,click on the trash icon. Edited/updating is
            completed by selecting the corresponding icon and submitting the
            change. Once the task is complete use the check box mark as
            complete.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoBox;

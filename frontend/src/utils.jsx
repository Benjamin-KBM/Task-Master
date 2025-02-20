import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 4000,
    // hideProgressBar: false,
    // closeOnClick: true,
    // pauseOnHover: true,
    // draggable: true,
    // progress: undefined,
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 4000,
    // hideProgressBar: false,
    // closeOnClick: true,
    // pauseOnHover: true,
    // draggable: true,
    // progress: undefined,
  });
};

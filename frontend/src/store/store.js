import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import showModalReducer from "./features/popUpModal/showModalSlice";
import showInfoReducer from "./features/info/infoSlice";
import showSignUpReducer from "./features/registerModal/showRegisterSlice";
const store = configureStore({
  reducer: {
    todos: todoReducer,
    popUpModal: showModalReducer,
    infoModal: showInfoReducer,
    signUpModal: showSignUpReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  isLoggedIn: false,
};

export const modalSlice = createSlice({
  name: "showModal",
  initialState,
  reducers: {
    // Login modal state handler
    toggleSignUp: (state, action) => {
      // replace state with whats inside with payload
      state.isVisible = action.payload;
    },
    // Login state handlers
    toggleLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { toggleSignUp, toggleLogin } = modalSlice.actions;
export default modalSlice.reducer;

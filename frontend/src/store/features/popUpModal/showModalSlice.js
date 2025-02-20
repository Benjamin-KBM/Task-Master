import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

export const modalSlice = createSlice({
  name: "showModal",
  initialState,
  reducers: {
    // Modal state handler
    toggleModal: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;

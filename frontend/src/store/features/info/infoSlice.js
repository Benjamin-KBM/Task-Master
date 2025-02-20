import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClicked: false,
};

export const infoSlice = createSlice({
  name: "showInfo",
  initialState,
  reducers: {
    // Info state handler
    toggleInfo: (state, action) => {
      state.isClicked = action.payload;
    },
  },
});

export const { toggleInfo } = infoSlice.actions;
export default infoSlice.reducer;

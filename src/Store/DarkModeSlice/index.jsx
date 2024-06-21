// darkModeSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    value: localStorage.getItem("darkmode") === "light" ? true : false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value;
      localStorage.setItem("darkmode", state.value ? "light" : "dark");
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state) => state.darkMode.value;

export default darkModeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


interface ThemeState {
  mode: "light" | "dark";
  btnState: "light" | "dark";
}

const initialState: ThemeState = {
  mode: "light",
  btnState: "light",
};


export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      state.btnState = state.btnState === "light" ? "dark" : "light";
    },
  },
});







export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
}

const initialState: ThemeState = {
  mode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {

    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
   
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;

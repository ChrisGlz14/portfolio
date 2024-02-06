import { createSlice } from "@reduxjs/toolkit";

interface LangState {
  mode: "es" | "en";
}

const initialState: LangState = {
  mode: "es",
};

export const langSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setEn: (state) => {
      state.mode = state.mode = "en";
    },
    setEs: (state) => {
      state.mode = state.mode = "es";
    },
  },
});

export const { setEn, setEs } = langSlice.actions;
export default langSlice.reducer;

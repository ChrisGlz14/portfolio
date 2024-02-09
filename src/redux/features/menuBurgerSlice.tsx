import { createSlice } from "@reduxjs/toolkit";

interface menuState {
  mode: "" | "hidden";
}

const initialState: menuState = {
  mode: "hidden",
};

export const menuBurgerSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu:(state) => {
        state.mode = state.mode === "hidden" ? "" : "hidden";
    }
  },
});

export const {toggleMenu} = menuBurgerSlice.actions
export default menuBurgerSlice.reducer
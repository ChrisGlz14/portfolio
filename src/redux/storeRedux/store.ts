// store.ts
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import langReducer from "../features/langSlice"



export const store = configureStore({
  reducer: {
    themeReducer,
    langReducer
  },
});

export type RootState = ReturnType<typeof store.getState>; //Se exportan los tipos de datos de lo que tiene el estado
export type AppDispatch = typeof store.dispatch; // a la funcion que utilicemos le damos info de que funcion puede ejecutar

export default store;

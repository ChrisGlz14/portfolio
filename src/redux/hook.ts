import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch,RootState } from "./storeRedux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>() //Cuando quiera utilizar CaRACTERISTICAS utiliza useAppDistach

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector //Cuando quieras un Selector de Estado, utiliza useAppSelector
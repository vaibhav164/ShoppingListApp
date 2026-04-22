import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector as any;

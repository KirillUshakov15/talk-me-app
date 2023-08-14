import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {actionCreators} from "@/store/action-creators";
import {RootState} from "@/store";

export default function useAction() {
    const AppDispatch = useDispatch();
    return bindActionCreators(actionCreators, AppDispatch)
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
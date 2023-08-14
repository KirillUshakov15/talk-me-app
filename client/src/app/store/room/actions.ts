import {IRoom} from "@/models/IRoom";
import {roomSlice} from "@/store/room/slice";
import {AppDispatch} from "@/store";

export const roomActionCreator = {
    enterRoom: (room: IRoom) => (dispatch: AppDispatch) => {
        dispatch(roomSlice.actions.setRoom({room: room}))
    },
    exitRoom: () => (dispatch: AppDispatch) => {
        dispatch(roomSlice.actions.setRoom({room: null}))
    },
}
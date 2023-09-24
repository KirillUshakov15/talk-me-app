import {IRoom} from "@/models/IRoom";
import {RoomEvents, roomSlice} from "@/store/room/slice";
import {AppDispatch} from "@/store";

export const roomActionCreator = {
    enterRoom: (room: IRoom) => (dispatch: AppDispatch) => {
        dispatch(roomSlice.actions.setRoom(room))
    },
    exitRoom: () => (dispatch: AppDispatch) => {
        dispatch(roomSlice.actions.setRoom(null))
    },
    setRoomEvent: (event: RoomEvents) => (dispatch: AppDispatch) => {
        dispatch(roomSlice.actions.setRoomEvent(event))
    },
}
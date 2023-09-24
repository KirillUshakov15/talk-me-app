import {IRoom} from "@/models/IRoom";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RoomEvents = 'none' | 'create' | 'leave' | 'edit-icon' | 'edit-name' | 'delete-icon'

interface IRoomState {
    room: IRoom | null;
    roomEvent: RoomEvents
}

const initialState: IRoomState = {
    roomEvent: 'none',
    room: null
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom: (state: IRoomState, action: PayloadAction<IRoom | null>) => {
            state.room = action.payload
        },
        setRoomEvent: (state: IRoomState, action: PayloadAction<RoomEvents>) => {
            state.roomEvent = action.payload
        },
    }
})

export default roomSlice.reducer;
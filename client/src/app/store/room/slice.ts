import {IRoom} from "@/models/IRoom";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IRoomState {
    room: IRoom | null
}

const initialState: IRoomState = {
    room: null
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom: (state: IRoomState, action: PayloadAction<IRoomState>) => {
            state.room = action.payload.room
        }
    }
})

export default roomSlice.reducer;
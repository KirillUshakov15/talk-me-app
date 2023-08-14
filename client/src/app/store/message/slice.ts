import {IEditableMessage, IMessagesPeriod} from "@/models/IMessage";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IMessageState {
    messages: IMessagesPeriod[],
    editableMessage: IEditableMessage | null
}

const initialState: IMessageState = {
    messages: [] as IMessagesPeriod[],
    editableMessage: null
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessages: (state: IMessageState, action: PayloadAction<IMessagesPeriod[]>) => {
            state.messages = action.payload;
        },
        setEditableMessage: (state: IMessageState, action: PayloadAction<IEditableMessage | null>) => {
            state.editableMessage = action.payload
        }
    }
})

export default messageSlice.reducer;
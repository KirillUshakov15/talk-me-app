import {IEditableMessage, IMessagesPeriod} from "@/models/IMessage";
import {AppDispatch} from "@/store";
import {messageSlice} from "@/store/message/slice";

export const messageActionCreator = {
    fillMessages: (messages: IMessagesPeriod[]) => (dispatch: AppDispatch) => {
        dispatch(messageSlice.actions.setMessages(messages))
    },
    clearMessages: () => (dispatch: AppDispatch) => {
        dispatch(messageSlice.actions.setMessages([] as IMessagesPeriod[]))
    },
    setEditableMessage: (editableMessage: IEditableMessage) => (dispatch: AppDispatch) => {
        dispatch(messageSlice.actions.setEditableMessage(editableMessage))
    },
    deleteEditableMessage: () => (dispatch: AppDispatch) => {
        dispatch(messageSlice.actions.setEditableMessage(null))
    },
}
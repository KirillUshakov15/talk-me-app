import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AlertType = "WARNING" | "ERROR" | "SUCCESS" | "INFO"

interface IAlert {
    isShow: boolean;
    title: string;
    type: AlertType
}

interface IModal {
    isOpen: boolean,
    name: string,
}

interface IPopupState {
    alert: IAlert,
    modal: IModal
}

const initialState: IPopupState = {
    alert: {
        isShow: false,
        title: '',
        type: "INFO"
    },
    modal: {
        isOpen: false,
        name: ''
    }
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setShowAlert(state, action: PayloadAction<IAlert>){
            state.alert.isShow = action.payload.isShow;
            state.alert.title = action.payload.title;
            state.alert.type = action.payload.type;
        },
        closeAlert(state){
            state.alert.isShow = false;
        },
        setOpenModal(state, action: PayloadAction<IModal>){
            state.modal.isOpen = action.payload.isOpen;
            state.modal.name = action.payload.name;
        },
        closeModal(state){
            state.modal.isOpen = false;
            state.modal.name = '';
        }
    }
});

export default popupSlice.reducer;
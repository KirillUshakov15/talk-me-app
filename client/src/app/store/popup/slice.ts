import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AlertType = "WARNING" | "ERROR" | "SUCCESS" | "INFO"

interface IAlert {
    isShow: boolean;
    title: string;
    type: AlertType
}

interface IPopupState {
    alert: IAlert
}

const initialState: IPopupState = {
    alert: {
        isShow: false,
        title: '',
        type: "INFO"
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
        }
    }
});

export default popupSlice.reducer;
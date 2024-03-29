import {AppDispatch} from "@/store";
import {AlertType, popupSlice} from "@/store/popup/slice";

export const popupActionCreator = {
    showAlert: (title: string, type: AlertType) => (dispatch: AppDispatch) => {
        dispatch(popupSlice.actions.setShowAlert({
            isShow: true,
            title: title,
            type: type
        }))
    },
    closeAlert: () => (dispatch: AppDispatch) => {
        dispatch(popupSlice.actions.closeAlert())
    },
    openModal: (name: string) => (dispatch: AppDispatch) => {
        dispatch(popupSlice.actions.setOpenModal({
            isOpen: true,
            name: name
        }))
    },
    closeModal: () => (dispatch: AppDispatch) => {
        dispatch(popupSlice.actions.closeModal())
    },
}
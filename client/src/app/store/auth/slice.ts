import {IUserData} from "@/models/IUserData";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuth} from "@/models/IAuth";

interface IAuthState {
    isAuth: boolean,
    userData: IUserData
}

const initialState: IAuthState = {
    isAuth: false,
    userData: {} as IUserData
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state: IAuthState, action: PayloadAction<IAuth>) => {
            state.isAuth = true;
            state.userData = action.payload.userData
            localStorage.setItem('accessToken', action.payload.accessToken)
        },
        logout: (state: IAuthState) => {
            state.isAuth = false;
            state.userData = {} as IUserData;
            localStorage.removeItem('accessToken')
        }
    }
})

//export default authSlice.reducer;
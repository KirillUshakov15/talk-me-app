import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {api} from "@/services";
import {authSlice} from "@/store/auth/slice"
import popup from "@/store/popup/slice";
import room from '@/store/room/slice';
import message from '@/store/message/slice'

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    popup,
    room,
    message,
    [api.reducerPath]: api.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware)
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']
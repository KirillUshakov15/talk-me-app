import {api} from "@/services/index";
import {ILogin, IRegistration} from "@/models/IAuth";
import {LOGIN, LOGOUT, REFRESH_ACCESS, REGISTRATION} from "@/contants/api";
import {authSlice} from "@/store/auth/slice";
import {popupActionCreator} from "@/store/popup/actions";

export const authAPI = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (data: ILogin) => {
                return {
                    url: LOGIN,
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(authSlice.actions.setAuth(data));
                    dispatch(popupActionCreator.showAlert(`С возвращением, ${data.userData.firstName}`, "SUCCESS"))
                } catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message, "ERROR"))
                }
            },
        }),
        registration: build.mutation({
            query: (data: IRegistration) => {
                return {
                    url: REGISTRATION,
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(authSlice.actions.setAuth(data));
                    dispatch(popupActionCreator.showAlert(`Регистрация прошла успешно`, "SUCCESS"))
                } catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message, "ERROR"))
                }
            },
        }),
        logout: build.mutation({
            query: () => {
                return {
                    url: LOGOUT,
                    method: 'GET',
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch}){
                dispatch(authSlice.actions.logout())
            }
        }),
        refreshAccess: build.mutation({
            query: () => {
                return {
                    url: REFRESH_ACCESS,
                    method: 'GET',
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(authSlice.actions.setAuth(data));
                } catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message, "ERROR"))
                }
            },
        })
    })
})

export const {
    useLoginMutation,
    useRegistrationMutation,
    useLogoutMutation,
    useRefreshAccessMutation
} = authAPI
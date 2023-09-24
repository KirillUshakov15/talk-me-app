import {api} from "@/services/index";
import {
    EDIT_USER_PASSWORD,
    EDIT_USER_PROFILE,
    GET_FRIENDS,
    GET_USER,
    GET_USER_ROOMS
} from "@/contants/api";
import {IUser} from "@/models/IUserData";
import {popupActionCreator} from "@/store/popup/actions";

export const userAPI = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<IUser, string>({
            query: (id: string) => {
                return {
                    url: GET_USER,
                    method: 'GET',
                    params: {
                        id: id,
                    },
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    credentials: 'include',
                }
            },
            providesTags: result => ['User']
        }),
        editProfile: build.mutation({
            query: (editData) => {
                return {
                    url: EDIT_USER_PROFILE,
                    method: 'PATCH',
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: editData,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled;
                    dispatch(popupActionCreator.showAlert(`Ваш профиль успешно отредактирован`, 'SUCCESS'))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message, "ERROR"))
                }
            },
            invalidatesTags: result => ['User']
        }),
        editPassword: build.mutation({
            query: (editData) => {
                return {
                    url: EDIT_USER_PASSWORD,
                    method: 'PATCH',
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: editData,
                    formData: true,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled;
                    dispatch(popupActionCreator.showAlert(`Ваш пароль успешно изменен`, 'SUCCESS'))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message, "ERROR"))
                }
            }
        }),
        getFriends: build.query<IUser[], string>({
            query: () => {
                return {
                    url: GET_FRIENDS,
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    credentials: 'include',
                }
            },
            providesTags: result => ['User']
        })
    }),
})

export const {
    useGetUserQuery,
    useEditProfileMutation,
    useEditPasswordMutation,
    useGetFriendsQuery,
} = userAPI
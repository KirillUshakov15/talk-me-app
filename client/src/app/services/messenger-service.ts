import {api} from "@/services/index";
import {CREATE_ROOM, EDIT_ROOM, GET_ROOM, GET_USER_ROOMS} from "@/contants/api";
import {IRoom, IRoomPagination, RoomType} from "@/models/IRoom";
import {popupActionCreator} from "@/store/popup/actions";
import {roomActionCreator} from "@/store/room/actions";

export interface IRoomCreationAttr{
    users: {id: string}[];
    name?: string | null;
    type: RoomType;
}

interface IRoomsQuery{
    queryText?: string,
    page: number,
}

export const messengerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRooms: build.query<IRoomPagination, IRoomsQuery>({
            query: (queryParams: IRoomsQuery) => {
                const {queryText, page} = queryParams;
                return {
                    url: GET_USER_ROOMS,
                    method: 'GET',
                    params: {
                        queryText,
                        page,
                        limit: 15
                    },
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    credentials: 'include',
                }
            },
            providesTags: result => ['Rooms']
        }),
        createRoom: build.mutation({
            query: (data) => {
                return {
                    url: CREATE_ROOM,
                    method: 'POST',
                    body: data,
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    dispatch(roomActionCreator.exitRoom())
                    const {data} = await queryFulfilled;
                    dispatch(roomActionCreator.enterRoom(data))
                    dispatch(popupActionCreator.showAlert("Беседа успешно создана", "SUCCESS"))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message, "ERROR"))
                }
            },
            invalidatesTags: result => ['Rooms']
        }),
        editRoom: build.mutation({
            query: (data) => {
                return {
                    url: EDIT_ROOM,
                    method: 'PATCH',
                    body: data,
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    credentials: 'include',
                }
            },
            invalidatesTags: result => ['Room']
        }),
        getRoom: build.query<IRoom, string>({
            query: (id: string) => {
                return {
                    url: GET_ROOM,
                    method: 'GET',
                    params: {roomID: id},
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    //dispatch(roomActionCreator.exitRoom())
                    const {data} = await queryFulfilled;
                    dispatch(roomActionCreator.enterRoom(data))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message, "ERROR"))
                }
            },
            providesTags: result => ['Room']
        }),
    })
})

export const {
    useCreateRoomMutation,
    useEditRoomMutation,
    useGetRoomsQuery,
    useLazyGetRoomQuery,
} = messengerApi
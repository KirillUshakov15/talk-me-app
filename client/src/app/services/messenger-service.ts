import {api} from "@/services/index";
import {CREATE_ROOM, GET_USER} from "@/contants/api";
import {IRoom, RoomType} from "@/models/IRoom";
import {popupActionCreator} from "@/store/popup/actions";
import {roomActionCreator} from "@/store/room/actions";

export interface IRoomCreationAttr{
    users: {id: string}[];
    name?: string | null;
    type: RoomType;
}

interface IRoomsQuery{
    userID: string
}

export const messengerApi = api.injectEndpoints({
    endpoints: (build) => ({
        createRoom: build.mutation({
            query: (data: IRoomCreationAttr) => {
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
                    const {data} = await queryFulfilled;
                    dispatch(roomActionCreator.enterRoom(data))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message, "ERROR"))
                }
            },
            invalidatesTags: result => ['Room']
        }),
        /*getRoom: build.query({
            query: () => {
                return {

                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    const {data} = await queryFulfilled;
                    dispatch(roomActionCreator.enterRoom(data))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message, "ERROR"))
                }
            },
        })*/
    })
})

export const {
    useCreateRoomMutation,
} = messengerApi
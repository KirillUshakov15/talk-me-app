import {API_SERVER_URL, REFRESH_ACCESS} from "@/contants/api";
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError, retry
} from "@reduxjs/toolkit/dist/query/react";
import {authSlice} from "@/store/auth/slice";
import {IAuth} from "@/models/IAuth";
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
    baseUrl: API_SERVER_URL,
});

const baseQueryIntercept: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
    > = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()){
            const release = await mutex.acquire()
            try{
                const refreshResult = await baseQuery({
                    url: REFRESH_ACCESS,
                    method: 'GET',
                    credentials: 'include',
                }, api, extraOptions)

                if (refreshResult.data) {
                    api.dispatch(authSlice.actions.setAuth(refreshResult.data as IAuth));
                    result = await baseQuery(args, api, extraOptions)
                }
            }
            finally {
                release()
            }
        }
        else{
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Auth', 'User', 'Room', 'Rooms'],
    baseQuery: baseQueryIntercept,
    endpoints: () => ({})
})
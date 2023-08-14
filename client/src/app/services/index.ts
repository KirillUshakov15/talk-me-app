
import {API_SERVER_URL} from "@/contants/api";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: API_SERVER_URL
});

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Auth', 'User', 'Room'],
    baseQuery: baseQuery,
    endpoints: () => ({})
})
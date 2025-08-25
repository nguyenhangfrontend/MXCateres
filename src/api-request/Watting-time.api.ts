import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';
export const WaitingTimeApi = createApi({
  reducerPath: 'WaitingTImeApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ['firmwares'],
  endpoints: (builder) => ({
    getWaitingTimeList: builder.query<any, any>({
      query: (params) => ({
        url: '/waiting-time',
        method: 'GET',
        params, // 👈 pass query params to backend
      }),
      keepUnusedDataFor: 1,
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useLazyGetWaitingTimeListQuery, endpoints } = WaitingTimeApi;

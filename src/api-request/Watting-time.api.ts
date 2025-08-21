import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';
export const firmwareApi = createApi({
  reducerPath: 'firmwareApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ['firmwares'],
  endpoints: (builder) => ({
    getWaitingTimeList: builder.query<any, any>({
      query: (data) => {
        return `/firmwares?order=${data.order || 'DESC'}&page=${
          data.page
        }&take=${data.size}&name=${data.name || ''}&id=${data.id || ''}`;
      },
      keepUnusedDataFor: 1,
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useLazyGetWaitingTimeListQuery, endpoints } = firmwareApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';
import {
  CustomerDetailTypeParams,
  SearchFormTypeParams,
  WaitingTimeDetailTypeParams,
  WaitingTimeResponse,
} from '@/pages/WaitingTime/types';
import { CustomerDetailResponse, WaitingTimeDetailResponse } from 'src/src/pages/WaitingTime/customerInfo/type';

export const StreammingApi = createApi({
  reducerPath: 'StreammingApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getStreamingList: builder.query<any, void>({
      query: () => ({
        url: 'http://10.1.38.54:9000/api/ai/camera/get_list_frame_and_camera_id',
        method: 'GET',
      }),
      keepUnusedDataFor: 1,
      transformResponse: (response) => ({
        ...response, // don’t wrap, just return it
      }),
    }),
  }),
});

export const { useLazyGetStreamingListQuery } = StreammingApi;

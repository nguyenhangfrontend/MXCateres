import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';
import {
  CustomerDetailTypeParams,
  SearchFormTypeParams,
  WaitingTimeDetailTypeParams,
  WaitingTimeResponse,
} from '@/pages/WaitingTime/types';
import { CustomerDetailResponse, WaitingTimeDetailResponse } from 'src/src/pages/WaitingTime/customerInfo/type';

export const SettingApi = createApi({
  reducerPath: 'SettingApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ['zones'],
  endpoints: (builder) => ({
    createZone: builder.mutation<any, any>({
      query: (body) => ({
        url: '/api/ai/zone/get_frame_and_config?camera_id=1',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['zones'],
    }),
  }),
});

export const { useCreateZoneMutation } = SettingApi;

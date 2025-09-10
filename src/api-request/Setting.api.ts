import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';

import { CustomerDetailResponse, WaitingTimeDetailResponse } from 'src/src/pages/WaitingTime/customerInfo/type';
import { SearchFormType } from '@/pages/Setting/Zones/types';

export const SettingApi = createApi({
  reducerPath: 'SettingApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['FrameConfig'],
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createZone: builder.mutation<any, any>({
      query: (body) => ({
        url: 'http://10.1.38.54:9000/api/ai/zone/setting_camera_config',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FrameConfig'],
    }),

    getFrameConfigBycamera: builder.query<any, SearchFormType>({
      query: (params) => ({
        url: 'http://10.1.38.54:9000/api/ai/zone/get_frame_and_config',
        method: 'GET',
        params,
      }),
      providesTags: ['FrameConfig'],
      keepUnusedDataFor: 1,
      transformResponse: (response) => ({
        ...response,
      }),
    }),
  }),
});

export const { useCreateZoneMutation, useLazyGetFrameConfigBycameraQuery } = SettingApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';

import { CustomerDetailResponse, WaitingTimeDetailResponse } from 'src/src/pages/WaitingTime/customerInfo/type';
import { SearchFormType } from '@/pages/Setting/Zones/types';

const AI_BOX_URL = import.meta.env.VITE_AI_BOX_URL;

export const SettingApi = createApi({
  reducerPath: 'SettingApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['FrameConfig'],
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createZone: builder.mutation<any, any>({
      query: (body) => ({
        url: `${AI_BOX_URL}/api/ai/zone/setting_camera_config`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FrameConfig'],
    }),

    getFrameConfigBycamera: builder.query<any, SearchFormType>({
      query: (params) => ({
        url: `${AI_BOX_URL}/api/ai/zone/get_frame_and_config`,
        method: 'GET',
        params,
      }),
      providesTags: ['FrameConfig'],
      keepUnusedDataFor: 1,
      transformResponse: (response) => ({
        ...response,
      }),
    }),

    getStreamingData: builder.query<any, any>({
      query: (params) => ({
        url: `${AI_BOX_URL}/api/ai/camera/get_list_frame_and_camera_id`,
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

export const { useCreateZoneMutation, useLazyGetFrameConfigBycameraQuery, useLazyGetStreamingDataQuery } = SettingApi;

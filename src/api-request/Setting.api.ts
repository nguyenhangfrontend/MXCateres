import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';

import { CustomerDetailResponse, WaitingTimeDetailResponse } from 'src/src/pages/WaitingTime/customerInfo/type';
import { SearchFormType } from '@/pages/Setting/Zones/types';

const AI_BOX_URL = import.meta.env.VITE_AI_BOX_URL;
const ORDER_URL = import.meta.env.VITE_ORDER_URL;
const PICKUP_URL = import.meta.env.VITE_PICKUP_URL;

export const SettingApi = createApi({
  reducerPath: 'SettingApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['FrameConfig'],
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createZone: builder.mutation<any, any>({
      query: (body) => ({
        url:
          body.zone_name === 'order'
            ? `${ORDER_URL}/api/ai/zone/setting_camera_config`
            : `${PICKUP_URL}/api/ai/zone/setting_camera_config`, // Replace with the correct alternative endpoint if needed
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FrameConfig'],
    }),

    getFrameConfigBycamera: builder.query<any, SearchFormType>({
      query: (params) => ({
        url:
          params.camera_id === 'cam1'
            ? `${ORDER_URL}/api/ai/zone/get_frame_and_config`
            : `${PICKUP_URL}/api/ai/zone/get_frame_and_config`, // Replace with the correct alternative endpoint if needed
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
      query: () => ({
        url: `${AI_BOX_URL}/api/ai/camera/get_list_frame_and_camera_id`,
        method: 'GET',
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

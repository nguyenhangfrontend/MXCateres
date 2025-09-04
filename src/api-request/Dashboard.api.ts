import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';
import { DashboardResponse, SearchFormTypeParams } from '@/pages/Dashboard/types';

export const DashboardApi = createApi({
  reducerPath: 'DashboardApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ['dashboard'],
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardResponse, SearchFormTypeParams>({
      query: (params) => ({
        url: '/dashboard/stats',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 1,
      transformResponse: (response) => ({
        ...response,
        status: response?.status,
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery, useLazyGetDashboardDataQuery } = DashboardApi;

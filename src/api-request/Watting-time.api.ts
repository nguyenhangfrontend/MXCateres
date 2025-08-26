import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';
import {
  CustomerDetailTypeParams,
  SearchFormTypeParams,
  WaitingTimeDetailTypeParams,
  WaitingTimeResponse,
} from '@/pages/WaitingTime/types';
import { CustomerDetailResponse, WaitingTimeDetailResponse } from '@/components/customerInfo/type';

export const WaitingTimeApi = createApi({
  reducerPath: 'WaitingTimeApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ['firmwares'],
  endpoints: (builder) => ({
    getWaitingTimeList: builder.query<WaitingTimeResponse, SearchFormTypeParams>({
      query: (params) => ({
        url: '/waiting-time',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 1,
      transformResponse: (response) => ({
        ...response?.data,
        pagination: response?.data?.pagination,
        status: response?.data?.status,
      }),
    }),

    getWaitingTimeDetail: builder.query<WaitingTimeDetailResponse, WaitingTimeDetailTypeParams>({
      query: (params) => ({
        url: '/waiting-time/detail',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 1,
      transformResponse: (response) => ({
        data: response?.data,
        status: response?.data?.status,
      }),
    }),

    getCustomerDetail: builder.query<CustomerDetailResponse, CustomerDetailTypeParams>({
      query: (params) => ({
        url: `/customers/customer/${params.id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 1,
      transformResponse: (response) => ({
        dataCustomerDetail: response,
        status: response?.data?.status,
      }),
    }),
  }),
});

export const {
  useLazyGetWaitingTimeListQuery,
  useGetWaitingTimeListQuery,

  useLazyGetWaitingTimeDetailQuery,
  useGetWaitingTimeDetailQuery,

  useLazyGetCustomerDetailQuery,
  useGetCustomerDetailQuery,
} = WaitingTimeApi;

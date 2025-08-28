import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';
import {
  CustomerDetailTypeParams,
  SearchFormTypeParams,
  WaitingTimeDetailTypeParams,
  WaitingTimeResponse,
} from '@/pages/WaitingTime/types';
import { CustomerDetailResponse } from 'src/src/pages/WaitingTime/customerInfo/type';
import { UserListResponse } from '../pages/UserManagement/types';

export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ['customers'],
  endpoints: (builder) => ({
    getUserList: builder.query<UserListResponse, SearchFormTypeParams>({
      query: (params) => ({
        url: '/customers',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 1,
      transformResponse: (response) => ({
        records: response?.records,
        pagination: {
          page: response?.page,
          rowsPerPage: response?.pageSize,
          total: response?.total,
          pageSize: response?.pageSize,
          totalPages: Math.ceil(response?.total / response?.pageSize),
        },
        status: response?.status,
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
  useLazyGetUserListQuery,
  useGetUserListQuery,

  useLazyGetCustomerDetailQuery,
  useGetCustomerDetailQuery,
} = UserApi;

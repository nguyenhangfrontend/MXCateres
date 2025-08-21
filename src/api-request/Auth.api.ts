import { baseQueryWithReauth } from './BaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ['devices'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<any, any>({
      query: () => '/users/current-user',
      keepUnusedDataFor: 1,
      transformResponse: (response) => {
        return response;
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: 'POST',
        body: data,
      }),

      // invalidatesTags: ["devices"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/users/current-user/password`,
        method: 'PATCH',
        body: data,
      }),

      // invalidatesTags: ["devices"],
    }),
  }),
});

export const { useLazyGetCurrentUserQuery, useLoginMutation, useChangePasswordMutation, endpoints } = authApi;

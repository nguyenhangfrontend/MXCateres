import { baseQueryWithReauth } from './BaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ['users'],
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: (page) => `/users?take=20&page=${page}`,
      transformResponse: (response) => {
        return response;
      },
    }),
    postUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users`,
          method: 'POST',
          body: data,
        };
      },
    }),
    getUser: builder.mutation({
      query: (id) => `/users/${id}`,
      transformResponse: (response) => {
        return response;
      },
    }),
    editUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users/${data.id}`,
          method: 'PUT',
          body: data,
        };
      },
      transformResponse: (response) => {
        return response.data;
      },
    }),
    deleteUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users/${data.id}`,
          method: 'DELETE',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetUsersMutation,
  usePostUserMutation,
  useGetUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  endpoints,
} = usersApi;

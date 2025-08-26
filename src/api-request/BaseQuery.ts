import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
// import { auth, loggedOut } from './authSlice'
import { Mutex } from 'async-mutex';
import { getCookieLocal, loggedOut, setCookieLocal } from '@/utils/auth';

type RefreshProps = {
  error?: FetchBaseQueryError;
  data?: any;
  meta?: FetchBaseQueryMeta | undefined;
};
// create a new mutex
const apiUrl = import.meta.env.VITE_API_URL;
const mutex = new Mutex();
const rawBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: apiUrl,
    // credentials: 'same-origin',
    prepareHeaders: (headers, { getState }) => {
      const token = getCookieLocal('token');
      console.log('token', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  {
    maxRetries: 0,
  },
);
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, any, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await rawBaseQuery(args, api, extraOptions);
  const token = getCookieLocal('token');
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult: RefreshProps = await rawBaseQuery(
          {
            url: '/auth/refreshToken',
            method: 'POST',
            body: {
              refreshToken: token,
            },
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          //save token to cookie
          // retry the initial query
          setCookieLocal('token', refreshResult.data?.data?.accessToken);
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          loggedOut();
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }
  return result;
};

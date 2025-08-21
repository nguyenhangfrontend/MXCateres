import { authApi } from '@/api-request/Auth.api';
import { usersApi } from '@/api-request/Users.api';
import { commonApi } from '@/api-request/Common.api';

export const apiReducer = {
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
};

export const apiMiddleware = [authApi.middleware, usersApi.middleware, commonApi.middleware];

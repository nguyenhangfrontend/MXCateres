import { authApi } from '@/api-request/Auth.api';
import { usersApi } from '@/api-request/Users.api';
import { commonApi } from '@/api-request/Common.api';
import { WaitingTimeApi } from 'src/src/api-request/Watting-time.api';

export const apiReducer = {
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [WaitingTimeApi.reducerPath]: WaitingTimeApi.reducer,
};

export const apiMiddleware = [authApi.middleware, usersApi.middleware, commonApi.middleware, WaitingTimeApi.middleware];

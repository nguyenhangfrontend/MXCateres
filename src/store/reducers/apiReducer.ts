import { authApi } from '@/api-request/Auth.api';
import { UserApi } from '@/api-request/Users.api';
import { DashboardApi } from '@/api-request/Dashboard.api';
import { commonApi } from '@/api-request/Common.api';
import { WaitingTimeApi } from 'src/src/api-request/WattingTime.api';

export const apiReducer = {
  [authApi.reducerPath]: authApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [DashboardApi.reducerPath]: DashboardApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [WaitingTimeApi.reducerPath]: WaitingTimeApi.reducer,
};

export const apiMiddleware = [
  authApi.middleware,
  UserApi.middleware,
  DashboardApi.middleware,
  commonApi.middleware,
  WaitingTimeApi.middleware,
];

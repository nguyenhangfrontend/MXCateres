import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';
import { getSocket } from '@/socket/SocketClient';
import { MessageEvent } from '@/socket/SocketEvent';
import { store } from '@/store';
export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getDataRealtime: builder.query<MessageEvent[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(photoId, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();
          console.log('socket', socket);
          socket.on('receiveMessage', (data: any) => {
            console.log('data', data);
            store.dispatch({
              type: 'common/setDataRealTime',
              payload: { dataRealTime: JSON.parse(data) },
            });
          });

          await cacheEntryRemoved;
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
    }),
  }),
});

export const { useLazyGetDataRealtimeQuery } = commonApi;

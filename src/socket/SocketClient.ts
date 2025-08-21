import socketIOClient from 'socket.io-client';
import { getCookieLocal } from '@/utils/auth';
// import { store } from "@/store";
let socket: any;

const getSocket = () => {
  if (!socket) {
    socket = socketIOClient(
      process.env.NEXT_PUBLIC_BASE_SOCKET_URL || '',

      {
        reconnection: true,
        query: {
          token: getCookieLocal('token'),
        },
      },
    );
    // client-side
    socket.on('connect', () => {
      // store.dispatch({
      //   type: "common/setConnectedSocketStatus",
      //   payload: { isConnectSocket: "connected" },
      // });
    });
    socket.on('connect_error', () => {
      // store.dispatch({
      //   type: "common/setConnectedSocketStatus",
      //   payload: { isConnectSocket: "not_connected" },
      // });
    });
    socket.on('disconnect', () => {
      // store.dispatch({
      //   type: "common/setConnectedSocketStatus",
      //   payload: { isConnectSocket: "not_connected" },
      // });
    });
    // if (!socket.connected) {
    //     onDisconnect();
    // }
  }
  return socket;
};

const unSubcribeSocket = () => {
  if (socket) {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('pong');
    // store.dispatch({
    //   type: 'common/setConnectedSocketStatus',
    //   payload: { isConnectSocket: '' },
    // });
  }
};
export { getSocket, unSubcribeSocket };

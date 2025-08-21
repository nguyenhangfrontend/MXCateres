import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type DeviceTypes = {
  dataRealTime?: any;
  isConnectSocket?: string
}
const initialState: DeviceTypes = {
  isConnectSocket: '',
  dataRealTime: {}
  
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setConnectedSocketStatus: (state: DeviceTypes, action: PayloadAction<DeviceTypes>) => {
      state.isConnectSocket = action.payload.isConnectSocket;
    },
    setDataRealTime: (state: DeviceTypes, action: PayloadAction<DeviceTypes>) => {
      state.dataRealTime = action.payload.dataRealTime;
    },
  },
});

export default common;

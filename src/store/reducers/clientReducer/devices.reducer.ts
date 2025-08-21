import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type DeviceTypes = {
  tabControlKey?: string;
  isConnectSocket?: boolean,
  dataOneDevice?: any,
  tabManagementKey?: string,
  mac?: string,
}
const initialState: any = {
  tabControlKey: '',
  isConnectSocket: '',
  dataOneDevice: {},
  tabManagementKey: '',
  mac: ''
};

const devices = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setTabControlKey: (state: DeviceTypes, action: PayloadAction<DeviceTypes>) => {
      state.tabControlKey = action.payload.tabControlKey;
    },
    setTabManagementKey: (state: DeviceTypes, action: PayloadAction<DeviceTypes>) => {
      state.tabManagementKey = action.payload.tabManagementKey;
    },
    setDataOneDevice: (state: DeviceTypes, action: PayloadAction<DeviceTypes>) => {
      state.dataOneDevice = action.payload.dataOneDevice;
    },
    
    setMacDevice: (state: DeviceTypes, action: PayloadAction<DeviceTypes>) => {
      state.mac = action.payload.mac;
    },
    
  },
});

export default devices;

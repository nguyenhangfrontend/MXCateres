import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  token?: string;
  refresh_token?: string;
  userInfo?: Object;
}

const initialState: IAuth = {
  token: undefined,
  refresh_token: undefined,
  userInfo: {}
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state: IAuth, action: PayloadAction<IAuth>) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo
    },
   
  },
});

export default auth;

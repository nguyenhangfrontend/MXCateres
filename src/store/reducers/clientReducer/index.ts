import auth from "./auth.reducer";
import devices from "./devices.reducer";
import common from "./common.reducer";

export const clientReducers = { auth: auth.reducer, devices: devices.reducer, common: common.reducer };

export { auth, devices,common };

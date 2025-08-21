import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import clientState from './reducers';
import { apiReducer, apiMiddleware } from "@/store/reducers/apiReducer"
export const store = configureStore({
    reducer: {clientState, ...apiReducer},
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
setupListeners(store.dispatch)

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

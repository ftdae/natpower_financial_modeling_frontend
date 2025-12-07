import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./../store/slices/authSlice";
import paramReducer from "./../store/slices/parameterSlice";
import resultReducer from "./../store/slices/resultSlice";
import dateReducer from "./../store/slices/dateSlice";
import sidebarReducer from "../store/slices/sidebarSlice";
import forecastSlice from "../store/slices/forecastSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    result: resultReducer,
    param: paramReducer,
    date: dateReducer,
    sidebar: sidebarReducer,
    app: forecastSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

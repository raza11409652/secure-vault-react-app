import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth";
import secureShareReducer from "./secure-share";
import vaultReducer from "./vault";
import userReducer from "./user";
import teamReducer from "./teams";
export const store = configureStore({
  reducer: {
    authReducer,
    secureShareReducer,
    vaultReducer,
    userReducer,
    teamReducer,
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

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

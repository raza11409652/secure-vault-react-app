import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { loginApi } from "../apis/auth/login-api";
import { AuthLogin, AuthLoginResponse, UserProfile } from "../types/auth";
import { deleteAllFromLocal, getItemFromLocal, setItemInLocal } from "../utils/local-storage";
interface AuthState {
  user?: UserProfile;
  authenticated: false | true;
  loader: true | false;
}
const initialState: AuthState = {
  authenticated: getItemFromLocal("auth-status") || false,
  user: getItemFromLocal("profile") || undefined,
  loader: false,
};
export const AuthAction = createAsyncThunk<AuthLoginResponse, AuthLogin>(
  "auth-login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await loginApi(body);
      return response;
    } catch (e) {
      return rejectWithValue("Auth failed");
    }
  }
);
const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    logout: (s) => {
      s.authenticated = false;
      s.user = undefined;
      deleteAllFromLocal()
    },
  },
  extraReducers: (b) => {
    b.addCase(AuthAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(AuthAction.rejected, (s) => {
      message.warning("Auth failed");
      s.loader = false;
    });
    b.addCase(AuthAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      s.user = payload.profile;
      s.authenticated = true;
      setItemInLocal("token", payload.token);
      setItemInLocal("auth-status", true);
      setItemInLocal("profile", payload.profile);
      message.success("Login success");
    });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;

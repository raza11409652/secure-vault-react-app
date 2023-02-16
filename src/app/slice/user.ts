import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersApi } from "../apis/user";
import { UserListApiResponse, UserListQuery } from "../types/users";
import handleAxiosError from "../utils/error/axios";
interface State {
  loader: true | false;
  userList?: UserListApiResponse;
}
const initialState: State = { loader: true };
export const GetUserListAction = createAsyncThunk<
  UserListApiResponse,
  UserListQuery
>("user-list-action", async (query, { rejectWithValue }) => {
  try {
    const data = await getUsersApi(query.page, query?.team);
    return data;
  } catch (e: any) {
    handleAxiosError(e);
    return rejectWithValue(e);
  }
});
const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(GetUserListAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(GetUserListAction.rejected, (s) => {
      s.loader = false;
    });
    b.addCase(GetUserListAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      s.userList = payload;
    });
  },
});
export default userSlice.reducer;

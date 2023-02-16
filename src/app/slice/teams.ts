import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTeamDetailsApi, getTeamListApi } from "../apis/team";
import { TeamDetails, TeamListApiResponse } from "../types/team";
interface State {
  teamDetails?: TeamDetails;
  loader: true | false;
  listTeam?: TeamListApiResponse;
}
const state: State = { loader: false };
export const GetTeamDetailsAction = createAsyncThunk<TeamDetails, string>(
  "get-team-details",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getTeamDetailsApi(id);
      return data;
    } catch (e) {
      return rejectWithValue("Api error");
    }
  }
);
export const GetTeamListAction = createAsyncThunk<TeamListApiResponse, number>(
  "get-team-list",
  async (p, { rejectWithValue }) => {
    try {
      const data = await getTeamListApi(p);
      return data;
    } catch (e) {
      return rejectWithValue("Error");
    }
  }
);
const teamSlice = createSlice({
  name: "team-slice",
  initialState: state,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(GetTeamDetailsAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(GetTeamDetailsAction.rejected, (s) => {
      s.loader = false;
    });
    b.addCase(GetTeamDetailsAction.fulfilled, (s, { payload }) => {
      s.teamDetails = payload;
      s.loader = false;
    });
    b.addCase(GetTeamListAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(GetTeamListAction.rejected, (s) => {
      s.loader = false;
    });
    b.addCase(GetTeamListAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      s.listTeam = payload;
    });
  },
});

export default teamSlice.reducer;

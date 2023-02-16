import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getShareViewDetails,
  secureShareApi,
  secureShareListApi,
} from "../apis/vault/share";
import {
  ShareBody,
  ShareVaultListApiResponse,
  ShareVaultQuery,
  ShareViewDetails,
} from "../types/vault";
import handleAxiosError from "../utils/error/axios";
interface State {
  link?: string;
  loader: false | true;
  shareList?: ShareVaultListApiResponse;
}
const initialState: State = {
  loader: false,
};
export const CreateNewShareAction = createAsyncThunk<string, ShareBody>(
  "share-action",
  async (b, { rejectWithValue }) => {
    try {
      const response = secureShareApi(b);
      return response;
    } catch (e) {
      throw rejectWithValue("Error");
    }
  }
);
export const GetShareVaultListAction = createAsyncThunk<
  ShareVaultListApiResponse,
  ShareVaultQuery
>("share-listing", async (v, { rejectWithValue }) => {
  try {
    const response = await secureShareListApi(v);
    return response;
  } catch (e: any) {
    handleAxiosError(e);
    return rejectWithValue("Error");
  }
});
export const GetShareViewDetails = createAsyncThunk<ShareViewDetails, string>(
  "share-view-details",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getShareViewDetails(id);
      return data;
    } catch (e) {
      // throw e;
      return rejectWithValue("Error");
    }
  }
);
const shareSlice = createSlice({
  name: "share-slice",
  initialState,
  reducers: {
    clearLink: (state) => {
      state.link = undefined;
    },
  },
  extraReducers: (b) => {
    b.addCase(CreateNewShareAction.rejected, (s) => {
      s.loader = false;
    });
    b.addCase(CreateNewShareAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      s.link = payload;
    });
    b.addCase(CreateNewShareAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(GetShareVaultListAction.rejected, (s) => {
      s.loader = false;
      s.shareList = undefined;
    });
    b.addCase(GetShareVaultListAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      // s.link = payload;
      s.shareList = payload;
    });
    b.addCase(GetShareVaultListAction.pending, (s) => {
      s.loader = true;
    });
  },
});
export const { clearLink } = shareSlice.actions;

export default shareSlice.reducer;

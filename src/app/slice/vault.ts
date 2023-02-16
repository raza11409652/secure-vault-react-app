import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVaultApi, getVaultDetailsApi } from "../apis/vault/vault";
// import { secureShareApi, secureShareListApi } from "../apis/vault/share";
import {
  VaultDetails,
  VaultListApiResponse,
  VaultViewDetailsBody,
} from "../types/vault";
import handleAxiosError from "../utils/error/axios";
import { getItemFromLocal, setItemInLocal } from "../utils/local-storage";
interface State {
  loader: false | true;
  list?: VaultListApiResponse;
  idSelected?: string;
  details?: VaultDetails;
}
const initialState: State = {
  loader: false,
  idSelected: getItemFromLocal("vault-id"),
};
export const GetVaultListAction = createAsyncThunk<
  VaultListApiResponse,
  number
>("get-vault-list", async (page, { rejectWithValue }) => {
  try {
    const response = await getVaultApi(page);
    return response;
  } catch (e) {
    return rejectWithValue("Error");
  }
});

export const GetVaultDetailsAction = createAsyncThunk<
  VaultDetails,
  VaultViewDetailsBody
>("details", async (body, { rejectWithValue }) => {
  try {
    const data = await getVaultDetailsApi(body);
    return data;
  } catch (e: any) {
    handleAxiosError(e);
    return rejectWithValue("Error");
  }
});
interface StateSetCurrent {
  payload: string;
  type: string;
}
const vaultSlice = createSlice({
  name: "vault-slice",
  initialState,
  reducers: {
    setSelectedVaultId: (state, a: StateSetCurrent) => {
      setItemInLocal("vault-id", a.payload);
      state.idSelected = a.payload;
    },
    clearDetails: (state) => {
      state.details = undefined;
    },
  },
  extraReducers: (b) => {
    b.addCase(GetVaultListAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(GetVaultListAction.rejected, (s) => {
      s.loader = false;
      s.list = undefined;
    });
    b.addCase(GetVaultListAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      s.list = payload;
    });
    b.addCase(GetVaultDetailsAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(GetVaultDetailsAction.rejected, (s) => {
      s.loader = false;
      s.details = undefined;
    });
    b.addCase(GetVaultDetailsAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      s.details = payload;
    });
  },
});
export const { setSelectedVaultId, clearDetails } = vaultSlice.actions;

export default vaultSlice.reducer;

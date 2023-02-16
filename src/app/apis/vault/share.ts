import {
  ShareBody,
  ShareVaultListApiResponse,
  ShareVaultQuery,
  ShareViewDetails,
} from "../../types/vault";
import axios from "../axios";

export const secureShareApi = async (b: ShareBody) => {
  try {
    const { data } = await axios.post<{ url: string }>("secure-share", b);
    return data.url;
  } catch (e) {
    throw e;
  }
};

export const secureShareListApi = async (q: ShareVaultQuery) => {
  try {
    const { data } = await axios.get<ShareVaultListApiResponse>(
      `secure-share`,
      {
        params: {
          ...q,
          size: 20,
        },
      }
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const getShareViewDetails = async (id: string) => {
  try {
    const { data } = await axios.get<ShareViewDetails>(`secure-share/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

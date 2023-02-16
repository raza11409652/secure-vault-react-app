import {
  VaultCreateBody,
  VaultDetails,
  VaultListApiResponse,
  VaultViewDetailsBody,
} from "../../types/vault";
import axios from "../axios";

export const getVaultApi = async (page: number, query?: string) => {
  try {
    const { data } = await axios.get<VaultListApiResponse>(
      `vault?page=${page}&size=10`
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const getVaultDetailsApi = async (body: VaultViewDetailsBody) => {
  try {
    const { data } = await axios.post<VaultDetails>(`vault/${body.id}`, {
      password: body?.password,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const createVaultEntryApi = async (body: VaultCreateBody) => {
  try {
    const { data } = await axios.post("vault", body);
    return data;
  } catch (e) {
    throw e;
  }
};

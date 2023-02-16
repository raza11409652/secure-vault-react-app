import { UserListApiResponse } from "../../types/users";
import axios from "../axios";

export const getUsersApi = async (page: number, team?: string) => {
  try {
    const { data } = await axios.get<UserListApiResponse>("user", {
      params: {
        page,
        size: 20,
        ...(team && { team }),
      },
    });
    // console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
};

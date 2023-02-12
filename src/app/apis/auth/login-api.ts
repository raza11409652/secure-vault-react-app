import { AuthLogin, AuthLoginResponse } from "../../types/auth";
import axios from "../axios";

export const loginApi =async (b: AuthLogin) => {
  try {
    const {data} = await axios.post<AuthLoginResponse>("auth/login",b)
    return data
  } catch (e) {
    throw e;
  }
};

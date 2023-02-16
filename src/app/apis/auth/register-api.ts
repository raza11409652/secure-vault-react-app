import { AuthRegister } from "../../types/auth";
import axios from "../axios";

export const registerApi = async (b: AuthRegister, team?: string) => {
  try {
    const { data } = await axios.post(`auth/register?team=${team || ""}`, b);
    return data;
  } catch (e) {
    throw e;
  }
};

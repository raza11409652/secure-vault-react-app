import { TeamDetails, TeamListApiResponse } from "../../types/team";
import axios from "../axios";

/**
 * Get team details api
 * @param id
 * @returns
 */
export const getTeamDetailsApi = async (id: string) => {
  try {
    const { data } = await axios.get<TeamDetails>(`teams/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getTeamListApi = async (page: number) => {
  try {
    const { data } = await axios.get<TeamListApiResponse>(
      `teams?size=10&page=${page}`
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const getTeamInvite = async (id: string) => {
  try {
    const { data } = await axios.get<string>(`teams/invite/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

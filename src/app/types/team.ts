import { User } from "./users";

export interface TeamDetails {
  team: Team;
  admin: User;
}
export interface Team {
  _id: string;
  createdBy: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface TeamListApiResponse {
  totalCount: number;
  records?: Team[] | null;
  totalPages: number;
  currentPage: number;
}

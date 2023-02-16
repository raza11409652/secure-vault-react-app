export interface UserListApiResponse {
  totalCount: number;
  records?: User[] | null;
  totalPages: number;
  currentPage: number;
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  role: string;
  team?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserListQuery {
  page: number;
  team?: string;
}

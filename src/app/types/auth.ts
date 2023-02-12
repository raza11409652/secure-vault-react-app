export interface AuthLogin {
  email: string;
  password: string;
}
export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  profile?: string;
  role?:string
}
export interface AuthLoginResponse {
  profile: UserProfile;
  token: string
}

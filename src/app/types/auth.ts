export interface AuthLogin {
  email: string;
  password: string;
}
export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  profile?: string;
  role?: string;
  isEmailVerified: boolean;
  team?: string;
}
export interface AuthLoginResponse {
  profile: UserProfile;
  token: string;
}

export interface AuthRegister {
  firstName: string;
  email: string;
  password: string;
  lastName: string;
}

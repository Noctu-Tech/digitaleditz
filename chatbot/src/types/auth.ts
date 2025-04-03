
export interface AuthData {
    email: string;
    password: string;
}

export interface SignupData extends AuthData {
    username: string;
}
export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
}

export interface AuthResponse {
  message: string;
  user: User;
}
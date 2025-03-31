
export interface AuthData {
    email: string;
    password: string;
}

export interface SignupData extends AuthData {
    username: string;
}

export interface AuthResponse {
    token: string;
    
}
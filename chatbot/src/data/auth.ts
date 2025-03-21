import { ENV } from "@/lib/config";
interface AuthCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const signin = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${ENV.BACKEND_URL}/auth/signin`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Sign in failed');
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const signup = async (data: AuthCredentials): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${ENV.BACKEND_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Sign up failed');
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};
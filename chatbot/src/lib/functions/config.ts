import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Export environment variables with types
export const ENV = {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8000',
    ISDEV:Boolean(process.env.IS_DEV)
};

// Type definition for the ENV object
export type EnvConfig = typeof ENV;

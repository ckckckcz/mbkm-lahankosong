import { User } from './user';

export interface AuthResponse {
    message: string;
    token?: string;
    user?: Partial<User>;
    error?: string;
}

import type { User } from "./user";

export interface AuthResponse {
    user: User;
    access_token: string;
    token_type: string;
    expires_in: string
}


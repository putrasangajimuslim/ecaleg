export interface LoginResp {
    id: string;
    email: string;
    password: string;
    isActive: boolean;
    role: string;
    token: string;
}
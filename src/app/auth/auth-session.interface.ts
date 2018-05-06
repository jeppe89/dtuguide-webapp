export interface AuthSession {
    username: string;
    isAdmin: boolean;
    validSession: boolean;
    exp: number;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface UserFromToken {
  sub: string;
  exp: number;
  iat: number;
}
export type User = UserFromToken | null;

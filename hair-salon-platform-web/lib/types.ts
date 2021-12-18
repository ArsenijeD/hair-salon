import { UserRole, TypeOfService } from "./constants";

export interface LoginData {
  username: string;
  password: string;
}

export interface TokenDecoded {
  sub: string;
  exp: number;
  iat: number;
}

export interface Auth {
  user: User | null;
  loading: boolean;
  decoded: TokenDecoded | null;
  jwt: string | null;
}

export interface UserAuthority {
  id: number;
  name: UserRole;
}
export interface NewUser {
  dateOfBirth: string;
  firstName: string;
  gender: string;
  lastName: string;
  phoneNumber: string;
  userAuthorities: UserAuthority[];
  username: string;
}

export interface User {
  dateOfBirth: string;
  firstName: string;
  gender: string;
  id: number;
  lastName: string;
  phoneNumber: string;
  userAuthorities: UserAuthority[];
  username: string;
}

export interface Reservation {
  id: number;
  worker: User;
  customer: User;
  date: string;
  durationMinutes: number;
  typeOfService: TypeOfService;
}

export interface CustomersResponse {
  data: User[];
}

import { UserRole, TypeOfService, Length } from "./constants";

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
  decoded: TokenDecoded | null;
  isAdmin: boolean;
  jwt: string | null;
  loading: boolean;
  user: User | null;
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

export interface User extends NewUser {
  id: number;
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

export interface HairSalonService {
  length: Length;
  name: TypeOfService;
  price: number;
}

export interface NewHairSalonService extends HairSalonService {
  id: number;
}

export interface NewService {
  hairsalonService: HairSalonService;
  percentage: number;
  user: User;
}

export interface Service extends NewService {
  id: number;
}

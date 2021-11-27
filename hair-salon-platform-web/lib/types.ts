import { UserRole, TypeOfService } from "./constants";

export interface LoginData {
  username: string;
  password: string;
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

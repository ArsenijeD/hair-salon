import { Authority } from "./authority";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    dateOfBirth: Date;
    phoneNumber: string;
    gender: String;
    userAuthorities: Authority[];
}
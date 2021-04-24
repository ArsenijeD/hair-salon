import { Authority } from "./authority";
import { Gender } from "./gender";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    dateOfBirth: Date;
    phoneNumber: string;
    gender: Gender;
    userAuthorities: Authority[];
}
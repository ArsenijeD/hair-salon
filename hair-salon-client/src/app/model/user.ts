import { Authority } from "./authority";
import { Gender } from "./gender";

export class User {
    //TODO: Consider how to handle whis separate id, 
    //because some model calsses need to be instantiated without id
    public id: number;
    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public dateOfBirth: Date,
        public phoneNumber: string,
        public gender: Gender,
        public userAuthorities: Authority[]
    ) {}
}
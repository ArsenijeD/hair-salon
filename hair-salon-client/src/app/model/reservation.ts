import { TypeOfService } from "./typeOfService";
import { User } from "./user";

export class Reservation {
    public id: number;
    constructor(
        public date: Date,
        public customer: User,
        public worker: User,
        public typeOfService: TypeOfService
    ) {}
}
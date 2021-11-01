import { TypeOfService } from "./typeOfService";
import { User } from "./user";

export class Reservation {
    public id: number;
    constructor(
        public date: Date,
        public worker: User,
        public customer?: User,
        public typeOfService?: TypeOfService
    ) {}
}
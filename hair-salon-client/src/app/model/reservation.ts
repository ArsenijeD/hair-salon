import { TypeOfService } from "./typeOfService";
import { User } from "./user";

export class Reservation {
    id: number;
    date: Date;
    customer: User;
    worker: User;
    typeOfService: TypeOfService;
}
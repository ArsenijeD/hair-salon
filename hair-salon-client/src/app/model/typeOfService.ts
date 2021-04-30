import { Type } from "@angular/core";
import { Length } from "./length";

export class TypeOfService {
    constructor(
        public id: number,
        public name: string,
        public length: Length,
        public price: number
    ) {}
}
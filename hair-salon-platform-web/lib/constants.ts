import { generateSlots } from "./helpers";

export enum routerPaths {
  HOME = "/",
  LOGIN = "/login",
}

export const slotsConfig = {
  // Hours (0-23)
  start: 8,
  end: 20,
  // Minutes
  interval: 60,
  // Pixels
  slotHeight: 140,
};

export const slots = generateSlots(slotsConfig);

export enum UserRole {
  Admin = "ADMIN",
  Apprentice = "APPRENTICE",
  Customer = "CUSTOMER",
  Employee = "EMPLOYEE",
}

export enum TypeOfService {
  Haircut = "HAIRCUT",
  HairStyling = "HAIR_STYLING", //Feniranje
  Minival = "MINIVAL",
  HairStranding = "HAIR_STRANDING", //Pramenovi
  HairDyeing = "HAIR_DYEING",
  HairBun = "HAIR_BUN",
}

export const TYPES_OF_SERVICE: { [key: string]: string } = {
  [TypeOfService.Haircut]: "Šišanje",
  [TypeOfService.HairStyling]: "Feniranje",
  [TypeOfService.Minival]: "Minival",
  [TypeOfService.HairStranding]: "Pramenovi",
  [TypeOfService.HairDyeing]: "Farbanje",
  [TypeOfService.HairBun]: "Pundja",
};

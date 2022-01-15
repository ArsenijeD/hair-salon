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

export const ROLES = {
  ADMIN: { id: 1, name: UserRole.Admin },
  EMPLOYEE: { id: 2, name: UserRole.Employee },
  APPRENTICE: { id: 3, name: UserRole.Apprentice },
  CUSTOMER: { id: 4, name: UserRole.Customer },
};

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

export enum Length {
  Short = "SHORT",
  Medium = "MEDIUM",
  Long = "LONG",
}

export const LENGTH: { [key: string]: string } = {
  [Length.Short]: "Kratko",
  [Length.Medium]: "Srednje",
  [Length.Long]: "Dugo",
};

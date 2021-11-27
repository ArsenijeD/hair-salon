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
  slotHeight: 100,
};

export const slots = generateSlots(slotsConfig);

export enum UserRole {
  ADMIN = "ADMIN",
  APPRENTICE = "APPRENTICE",
  CUSTOMER = "CUSTOMER",
  EMPLOYEE = "EMPLOYEE",
}

export enum TypeOfService {
  HAIRCUT = "HAIRCUT",
  NAILS = "NAILS",
  SHAVING = "SHAVING",
}

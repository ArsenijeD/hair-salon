import axios from "axios";

import {
  LoginData,
  NewUser,
  User,
  Reservation,
  NewService,
  Service,
} from "lib/types";
import { UserRole } from "lib/constants";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    ["Content-Type"]: "application/json",
  },
});

// Users and Auth
export const loginUser = (data: LoginData) => {
  return apiClient.post("authenticate", data);
};

export const getUserByUsername = async (username: string) => {
  return await apiClient.get<User>("users", { params: { username } });
};

export const getCustomers = () => {
  return apiClient.get<User[]>("users", {
    params: { role: UserRole.Customer },
  });
};

export const getWorkers = () => {
  return apiClient.get<User[]>("users", {
    params: { role: UserRole.Employee },
  });
};

export const createUser = (values: NewUser) => {
  return apiClient.post("users", values);
};

// Reservations
export const createReservation = (values: any) => {
  return apiClient.post<Reservation>("reservations", values);
};

export const putReservation = (values: any, id: number) => {
  return apiClient.put<Reservation>(`reservations/${id}`, values);
};

export const getReservations = (workerId: number, date: string) => {
  return apiClient.get<Reservation[]>(`reservations/worker/${workerId}`, {
    params: { date },
  });
};

export const deleteReservation = (id: number) => {
  return apiClient.delete(`reservations/${id}`);
};

// Services
export const getServices = (workerId: number) => {
  return apiClient.get<Service[]>(`hairsalon-services/worker/${workerId}`);
};

export const createService = (values: NewService) => {
  return apiClient.post("hairsalon-services", values);
};

export const updateService = (
  values: { percentage: number },
  workerId: number,
  serviceId: number
) => {
  return apiClient.patch(
    `hairsalon-services/worker/${workerId}/service/${serviceId}`,
    values
  );
};

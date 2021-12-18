import axios from "axios";

import { LoginData, NewUser, User, Reservation } from "lib/types";
import { UserRole } from "lib/constants";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    ["Content-Type"]: "application/json",
  },
});

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

export const createReservation = (values: any) => {
  return apiClient.post("reservations", values);
};

export const getReservations = (workerId: number, date: string) => {
  return apiClient.get<Reservation[]>(`reservations/worker/${workerId}`, {
    params: { date },
  });
};

export const deleteReservation = (id: number) => {
  return apiClient.delete(`reservations/${id}`);
};

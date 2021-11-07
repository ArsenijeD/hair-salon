import axios from "axios";

import { LoginData } from "lib/types";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    ["Content-Type"]: "application/json",
  },
});

export const loginUser = (data: LoginData) => {
  return apiClient.post("authenticate", data);
};

export const getReservations = () => {
  return apiClient.get("reservations");
};

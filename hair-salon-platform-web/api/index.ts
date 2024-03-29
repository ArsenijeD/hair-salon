import axios from "axios";

import {
  LoginData,
  NewUser,
  User,
  Reservation,
  NewUserService,
  UserService,
  Service,
  Material,
  NewMaterial,
  FinalizedService,
  UsedMaterial,
  NewFinalizedService,
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

export const deleteUser = (id: number) => {
  return apiClient.delete(`users/${id}`);
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

// Materials
export const getMaterials = () => {
  return apiClient.get<Material[]>("materials");
};

export const createMaterial = (data: NewMaterial) => {
  return apiClient.post<Material>("materials", data);
};

export const updateMaterial = (data: Material, id: number) => {
  return apiClient.put<Material>(`materials/${id}`, data);
};

export const deleteMaterial = (id: number) => {
  return apiClient.delete(`materials/${id}`);
};

// User Services
export const getUserServices = (workerId: number) => {
  return apiClient.get<UserService[]>(`hairsalon-services/worker/${workerId}`);
};

export const createUserService = (values: NewUserService) => {
  return apiClient.post("hairsalon-services", values);
};

export const updateUserService = (
  values: { percentage: number },
  workerId: number,
  serviceId: number
) => {
  return apiClient.patch(
    `hairsalon-services/worker/${workerId}/service/${serviceId}`,
    values
  );
};

export const deleteUserService = (workerId: number, serviceId: number) => {
  return apiClient.delete(
    `hairsalon-services/worker/${workerId}/service/${serviceId}`
  );
};

// Services
export const getServices = () => {
  return apiClient.get<Service[]>("services");
};

export const createService = (data: Service) => {
  return apiClient.post<Service>("services", data);
};

export const updateService = (data: Service, id: number) => {
  return apiClient.put<Service>(`services/${id}`, data);
};

export const deleteService = (id: number) => {
  return apiClient.delete(`services/${id}`);
};

// Finalized Services
export const getFinalizedServices = (workerId: number, date: string) => {
  return apiClient.get<FinalizedService[]>(
    `finalized-hairsalon-services/worker/${workerId}`,
    {
      params: { date },
    }
  );
};

export const createFinalizedServices = (data: NewFinalizedService) => {
  return apiClient.post<FinalizedService>("finalized-hairsalon-services", data);
};

export const updateFinalizedServices = (data: FinalizedService) => {
  return apiClient.put<FinalizedService>(
    `finalized-hairsalon-services/${data.id}`,
    data
  );
};

export const deleteFinalizedServices = (id: number) => {
  return apiClient.delete(`finalized-hairsalon-services/${id}`);
};

// Used Materials
export const getUsedMaterials = (finalizedServiceIds: number[] | undefined) => {
  if (!finalizedServiceIds) {
    return;
  }
  return Promise.all(
    finalizedServiceIds.map((id) =>
      apiClient.get<UsedMaterial[]>(`used-materials/finalized-service/${id}`)
    )
  ).then((results) => {
    const res: any = {};
    results.forEach((result, index) => {
      res[finalizedServiceIds[index]] = result.data;
    });
    return res;
  });
};

// CONSTANTS ---

// Types of services
export const getTypesOfServices = () => {
  return apiClient.get<string[]>("type-of-services");
};

// Length
export const getLengths = () => {
  return apiClient.get<string[]>("lengths");
};

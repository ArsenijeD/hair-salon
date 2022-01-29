import { atom } from "recoil";

import { User } from "lib/types";

export const workerState = atom<User | null>({
  key: "servicesWorker",
  default: null,
});

export const excludeServicesState = atom<Number[]>({
  key: "excludeServices",
  default: [],
});

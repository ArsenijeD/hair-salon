import { atom } from "recoil";

import { Service, User } from "lib/types";

export const workerState = atom<User | null>({
  key: "servicesWorker",
  default: null,
});

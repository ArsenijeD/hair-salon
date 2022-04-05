import { atom } from "recoil";

import dayjs from "lib/dayjs";
import { Dayjs } from "dayjs";
import { FinalizedService, UsedMaterial, User } from "lib/types";

export const dateState = atom<Dayjs | null>({
  key: "reportDate", // unique ID (with respect to other atoms/selectors)
  default: dayjs(), // default value (aka initial value)
});

export const formState = atom({
  key: "reportForm",
  default: false,
});

export const editState = atom<FinalizedService | null>({
  key: "reportEdit",
  default: null,
});

export const workerState = atom<User | null>({
  key: "reportWorker",
  default: null,
});

export const usedMaterialsState = atom<UsedMaterial[]>({
  key: "usedMaterial",
  default: [],
});

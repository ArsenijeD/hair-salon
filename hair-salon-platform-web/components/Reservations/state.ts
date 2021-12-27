import { atom } from "recoil";

import dayjs from "lib/dayjs";
import { Dayjs } from "dayjs";
import { Reservation, User } from "lib/types";

export const dateState = atom<Dayjs | null>({
  key: "reservationsDate", // unique ID (with respect to other atoms/selectors)
  default: dayjs(), // default value (aka initial value)
});

export const formState = atom({
  key: "reservationForm",
  default: false,
});

export const activeIdState = atom<number | null>({
  key: "activeId",
  default: null,
});

export const editState = atom<Reservation | null>({
  key: "editReservation",
  default: null,
});

export const workerState = atom<User | null>({
  key: "reservationsWorker",
  default: null,
});

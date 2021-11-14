import { slotsConfig } from "./constants";
import dayjs from "dayjs";

export const generateSlots = () => {
  let startDate = dayjs().hour(slotsConfig.start).minute(0);
  let endDate = dayjs().hour(slotsConfig.end).minute(0);

  const slots = [];

  while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
    slots.push(startDate.format("HH:mm"));
    startDate = startDate.add(slotsConfig.interval, "minutes");
  }

  return slots;
};

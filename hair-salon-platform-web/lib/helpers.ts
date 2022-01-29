import dayjs from "dayjs";

import { LENGTH, slotsConfig, TYPES_OF_SERVICE } from "./constants";

export const generateSlots = (config: {
  start: number;
  end: number;
  interval: number;
  range?: boolean;
}) => {
  let startDate = dayjs().hour(config.start).minute(0);
  let endDate = dayjs().hour(config.end).minute(0);

  const slots = [];

  while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
    let item = startDate.format("HH:mm");
    if (!config.range) {
      slots.push(item);
      startDate = startDate.add(config.interval, "minutes");
    } else {
      startDate = startDate.add(config.interval, "minutes");
      item = `${item} - ${startDate.format("HH:mm")}`;
      slots.push(item);
    }
  }

  return slots;
};

export const calcSlotTopOffset = (start: string) => {
  const startDate = dayjs(start, "HH:mm");
  const dayStartDate = dayjs(`${slotsConfig.start}: 00`, "HH");

  const diff = startDate.diff(dayStartDate, "minutes");

  return diff * (slotsConfig.slotHeight / 60) + slotsConfig.slotHeight / 2;
};

export const calcSlotHeight = (duration: number) => {
  return duration * (slotsConfig.slotHeight / 60);
};

export const translateLength = (length: string) => {
  return LENGTH[length] || length.toLowerCase();
};

export const translateTypeOfService = (type: string) => {
  return TYPES_OF_SERVICE[type] || type.toLowerCase();
};

import dayjs from "dayjs";

import { DateFormat } from "@/constants/date";

export const formatDate = (date: string, format: DateFormat) => dayjs(date).format(format);

export const formatMSTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours ? `${hours}h` : ""} ${minutes}m ${remainingSeconds}s`;
};

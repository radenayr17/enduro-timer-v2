import dayjs from "dayjs";

import { DateFormat } from "@/constants/date";

export const formatDate = (date: string, format: DateFormat) => dayjs(date).format(format);

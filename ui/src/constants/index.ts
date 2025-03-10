import { Racer } from "@/hooks/api/race";

export const APP_BAR_TEXT = "Enduro Timer Admin";
export const DRAWER_WITH = 240;

export const ADMIN_RACE_PATH = "/admin/races";
export const ADMIN_RESULT_PATH = "/admin/results";
export const ADMIN_EVENT_PATH = "/admin/events";

export const MENU_ITEMS = [
  { text: "Race", path: ADMIN_RACE_PATH },
  { text: "Event", path: ADMIN_EVENT_PATH },
  { text: "Result", path: ADMIN_RESULT_PATH },
];

export const RACE_TABS: { label: string; value: string }[] = [
  { label: "Details", value: "details" },
  { label: "Categories", value: "categories" },
  { label: "Stages", value: "stages" },
  { label: "Racers", value: "racers" },
];

export const DEFAULT_RACER_HEADERS: { label: string; key: string; map?: (data: Racer) => void }[] = [
  {
    label: "Number",
    key: "number",
  },
  {
    label: "Name",
    key: "name",
    map: (data) => `${data.firstName ?? ""} ${data.lastName ?? ""}`,
  },
  {
    label: "Category",
    key: "category",
  },
];

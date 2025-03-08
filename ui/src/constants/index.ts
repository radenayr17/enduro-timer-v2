export const APP_BAR_TEXT = "Enduro Timer Admin";
export const DRAWER_WITH = 240;

export const ADMIN_RACE_PATH = "/admin/races";

export const MENU_ITEMS = [
  { text: "Races", path: ADMIN_RACE_PATH },
  { text: "Users", path: "/admin/users" },
  { text: "Results", path: "/admin/results" },
];

export const RACE_TABS: { label: string; value: string }[] = [
  { label: "Details", value: "detail" },
  { label: "Categories", value: "categories" },
  { label: "Stages", value: "stages" },
  { label: "Racers", value: "racers" },
];

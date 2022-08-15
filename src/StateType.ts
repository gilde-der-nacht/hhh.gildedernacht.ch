import type { DateTime } from "luxon";

export type DisplayState = "open" | "closed" | "none";

export type Restaurant = {
  label: string;
  menu: string;
  active: boolean;
  id: string;
  timestamp: DateTime;
}

export type Order = {
  id: string;
  name: string;
  timestamp: DateTime;
  timeWindow: number;
  restaurantId: string;
  displayState: DisplayState;
  active: boolean;
}

export type Entry = {
  id: string;
  name: string;
  menuItem: string;
  comment: string;
  orderId: string;
  active: boolean;
  timestamp: DateTime;
}

export type AppState = {
  restaurants: Restaurant[],
  orders: Order[],
  entries: Entry[],
}

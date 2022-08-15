import type { DateTime } from "luxon";

export type DisplayState = "open" | "closed" | "none";

export type Restaurant = {
  id: string;
  label: string;
  menu: string;
  active: boolean;
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
}

export type AppState = {
  restaurants: Restaurant[],
  orders: Order[],
  entries: Entry[],
}

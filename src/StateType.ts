import type { DateTime } from "luxon";

export type DisplayState = "open" | "closed" | "none";

export type Restaurant = {
  id: string;
  label: string;
  menu: string;
}

export type Order = {
  id: string;
  name: string;
  timestamp: DateTime;
  timeWindow: number;
  restaurantId: string;
  displayState: DisplayState;
}

export type AppState = {
  restaurants: Restaurant[],
  orders: Order[],
}

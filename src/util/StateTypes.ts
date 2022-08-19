import { DateTime } from "luxon";

export type DerivedRestaurantStatus = "active" | "inactive";
export type DerivedOrderStatus = "active" | "inactive";
export type DerivedEntryStatus = "active" | "inactive";

export type RestaurantState = {
  kind: "restaurant";
  id: string;
  label: string;
  menuLink: string;
  comment: string;
  status: DerivedRestaurantStatus;
  timestamp: DateTime;
};

export type OrderState = {
  kind: "order";
  restaurantId: string;
  id: string;
  orderer: string;
  comment: string;
  status: DerivedOrderStatus;
  timeWindow: number;
  timestamp: DateTime;
};

export type EntryState = {
  kind: "entry";
  orderId: string;
  id: string;
  eater: string;
  menuItem: string;
  comment: string;
  status: DerivedEntryStatus;
  timestamp: DateTime;
};

export type AppState = {
  restaurants: readonly RestaurantState[];
  orders: readonly OrderState[];
  entries: readonly EntryState[];
};

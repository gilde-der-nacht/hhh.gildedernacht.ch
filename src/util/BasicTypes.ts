import { DateTime } from "luxon";

export type RestaurantBase = {
  kind: "restaurant";
  id: string;
  label: string;
  menuLink: string;
  comment: string;
  timestamp: DateTime;
};

export type OrderBase = {
  kind: "order";
  restaurantId: string;
  id: string;
  orderer: string;
  comment: string;
  timeWindow: number;
  timestamp: DateTime;
};

export type EntryBase = {
  kind: "entry";
  orderId: string;
  id: string;
  eater: string;
  menuItem: string;
  comment: string;
  timestamp: DateTime;
};

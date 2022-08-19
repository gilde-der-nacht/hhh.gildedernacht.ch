import { DateTime } from "luxon";

export type RestaurantStatus = "active" | "inactive" | "deleted";
export type OrderStatus = "auto" | "active" | "inactive" | "deleted";
export type EntryStatus = "active" | "inactive" | "deleted";

export type RestaurantPost = {
  kind: "restaurant";
  id: string;
  label: string;
  menuLink: string;
  comment: string;
  status: RestaurantStatus;
};

export type OrderPost = {
  kind: "order";
  id: string;
  restaurantId: string;
  orderer: string;
  comment: string;
  timeWindow: number;
  status: OrderStatus;
};

export type EntryPost = {
  kind: "entry";
  id: string;
  orderId: string;
  eater: string;
  menuItem: string;
  comment: string;
  status: EntryStatus;
};

export type RestaurantGet = {
  kind: "restaurant";
  id: string;
  label: string;
  menuLink: string;
  comment: string;
  status: RestaurantStatus;
  timestamp: DateTime;
};

export type OrderGet = {
  kind: "order";
  id: string;
  restaurantId: string;
  orderer: string;
  comment: string;
  timeWindow: number;
  status: OrderStatus;
  timestamp: DateTime;
};

export type EntryGet = {
  kind: "entry";
  id: string;
  orderId: string;
  eater: string;
  menuItem: string;
  comment: string;
  status: EntryStatus;
  timestamp: DateTime;
};

export const isRestaurant = (o: any): o is Omit<RestaurantGet, "timestamp"> => {
  return (
    "kind" in o &&
    o.kind === "restaurant" &&
    "id" in o &&
    "label" in o &&
    "menuLink" in o &&
    "comment" in o &&
    "status" in o
  );
};

export const isOrder = (o: any): o is Omit<OrderGet, "timestamp"> => {
  return (
    "kind" in o &&
    o.kind === "order" &&
    "id" in o &&
    "restaurantId" in o &&
    "orderer" in o &&
    "comment" in o &&
    "timeWindow" in o &&
    "status" in o
  );
};

export const isEntry = (o: any): o is Omit<EntryGet, "timestamp"> => {
  return (
    "kind" in o &&
    o.kind === "entry" &&
    "id" in o &&
    "orderId" in o &&
    "eater" in o &&
    "menuItem" in o &&
    "comment" in o &&
    "status" in o
  );
};

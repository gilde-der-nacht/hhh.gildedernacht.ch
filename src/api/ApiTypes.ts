import { DateTime } from "luxon";

export type RestaurantStatus = "active" | "inactive" | "deleted";
export type OrderStatus = "auto" | "active" | "inactive" | "deleted";
export type EntryStatus = "active" | "inactive" | "deleted";

export type RestaurantPost = {
  type: "restaurant";
  id: string;
  label: string;
  menuLink: string;
  comment: string;
  status: RestaurantStatus;
};

export type OrderPost = {
  type: "order";
  id: string;
  restaurantId: string;
  orderer: string;
  comment: string;
  timeWindow: number;
  status: OrderStatus;
};

export type EntryPost = {
  type: "entry";
  id: string;
  orderId: string;
  eater: string;
  menuItem: string;
  comment: string;
  status: EntryStatus;
};

export type RestaurantGet = {
  type: "restaurant";
  id: string;
  label: string;
  menuLink: string;
  comment: string;
  status: RestaurantStatus;
  timestamp: DateTime;
};

export type OrderGet = {
  type: "order";
  id: string;
  restaurantId: string;
  orderer: string;
  comment: string;
  timeWindow: number;
  status: OrderStatus;
  timestamp: DateTime;
};

export type EntryGet = {
  type: "entry";
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
    "type" in o &&
    o.type === "restaurant" &&
    "id" in o &&
    "label" in o &&
    "menuLink" in o &&
    "comment" in o &&
    "status" in o
  );
};

export const isOrder = (o: any): o is Omit<OrderGet, "timestamp"> => {
  return (
    "type" in o &&
    o.type === "order" &&
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
    "type" in o &&
    o.type === "entry" &&
    "id" in o &&
    "orderId" in o &&
    "eater" in o &&
    "menuItem" in o &&
    "comment" in o &&
    "status" in o
  );
};

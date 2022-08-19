import { EntryState, OrderState, RestaurantState } from "@util/StateTypes";
import { DateTime } from "luxon";

export type RestaurantStatus = "active" | "inactive" | "deleted";
export type OrderStatus = "auto" | "active" | "inactive" | "deleted";
export type EntryStatus = "active" | "inactive" | "deleted";

export type RestaurantPost = Omit<RestaurantGet, "timestamp">;
export type OrderPost = Omit<OrderGet, "timestamp">;
export type EntryPost = Omit<EntryGet, "timestamp">;

export type RestaurantGet = Omit<RestaurantState, "status"> & {
  status: RestaurantStatus;
};

export type OrderGet = Omit<OrderState, "status"> & {
  status: OrderStatus;
};

export type EntryGet = Omit<EntryState, "status"> & {
  status: EntryStatus;
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

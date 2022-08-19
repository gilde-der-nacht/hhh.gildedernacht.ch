import { EntryBase, OrderBase, RestaurantBase } from "@util/BasicTypes";

export type RestaurantStatus = "active" | "inactive" | "deleted";
export type OrderStatus = "auto" | "active" | "inactive" | "deleted";
export type EntryStatus = "active" | "inactive" | "deleted";

export type RestaurantPost = Omit<RestaurantGet, "timestamp">;
export type OrderPost = Omit<OrderGet, "timestamp">;
export type EntryPost = Omit<EntryGet, "timestamp">;

export type RestaurantGet = RestaurantBase & {
  status: RestaurantStatus;
};

export type OrderGet = OrderBase & {
  status: OrderStatus;
};

export type EntryGet = EntryBase & {
  status: EntryStatus;
};

export type OlympResponse = RestaurantGet | OrderGet | EntryGet;

export type RawServerData = {
  publicBody: string;
  timestamp: string;
};

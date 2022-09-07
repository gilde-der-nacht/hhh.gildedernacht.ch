import { EntryBase, OrderBase, RestaurantBase } from "@util/BasicTypes";

export type DerivedRestaurantStatus = "active" | "inactive";
export type DerivedOrderStatus = "active" | "inactive";
export type DerivedEntryStatus = "active" | "inactive";

export type RestaurantState = RestaurantBase & {
  status: DerivedRestaurantStatus;
};

export type OrderState = OrderBase & {
  status: DerivedOrderStatus;
};

export type EntryState = EntryBase & {
  status: DerivedEntryStatus;
};

export type AppState = {
  restaurants: {
    active: readonly RestaurantState[];
    inactive: readonly RestaurantState[];
  };
  orders: { active: readonly OrderState[]; inactive: readonly OrderState[] };
  entries: { active: readonly EntryState[]; inactive: readonly EntryState[] };
};
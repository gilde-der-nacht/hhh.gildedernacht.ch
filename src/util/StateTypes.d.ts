import { ToastOptions } from "@components/static/Toast";
import { PageType } from "@pages/util/Router";
import { EntryBase, OrderBase, RestaurantBase } from "@util/BasicTypes";
import { DateTime } from "luxon";

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

export type AppData = {
  restaurants: {
    active: readonly RestaurantState[];
    inactive: readonly RestaurantState[];
  };
  orders: { active: readonly OrderState[]; inactive: readonly OrderState[] };
  entries: { active: readonly EntryState[]; inactive: readonly EntryState[] };
  now: DateTime;
};

export type AppState = {
  page: PageType;
  activeOrder: null | OrderState;
  toast: ToastOptions;
  showRestaurantList: boolean;
  showOrderList: boolean;
  showEntryList: boolean;
};

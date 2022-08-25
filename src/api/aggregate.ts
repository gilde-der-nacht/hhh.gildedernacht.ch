import { EntryGet, OrderGet, RestaurantGet } from "@api/ApiTypes";
import {
  AppState,
  EntryState,
  OrderState,
  RestaurantState,
} from "@util/StateTypes";
import { DateTime } from "luxon";

export const aggragateData = (
  data: (RestaurantGet | OrderGet | EntryGet)[],
  now: DateTime
): AppState => {
  const allRestaurants = data
    .filter((d): d is RestaurantGet => d.kind === "restaurant")
    .map((r) => {
      if (r.status === "deleted") {
        return null;
      }
      return { ...r, status: r.status } as RestaurantState;
    })
    .filter((r): r is RestaurantState => r !== null);
  const restaurants = {
    active: allRestaurants.filter((r) => r.status === "active"),
    inactive: allRestaurants.filter((r) => r.status === "inactive"),
  };

  const allOrders = data
    .filter((d): d is OrderGet => d.kind === "order")
    .map((o) => {
      if (o.status === "deleted") {
        return null;
      }
      if (!restaurants.active.map((r) => r.id).includes(o.restaurantId)) {
        return null;
      }
      if (o.status === "auto") {
        const delta = o.timestamp
          .plus({ minutes: o.timeWindow })
          .diff(now, ["hours", "minutes"])
          .toObject() as {
          hours: number;
          minutes: number;
        };
        const status =
          delta.minutes >= 0
            ? "active"
            : delta.hours >= -24
            ? "inactive"
            : "deleted";
        if (status === "deleted") {
          return null;
        }
        return { ...o, status } as OrderState;
      }
      return { ...o, status: o.status } as OrderState;
    })
    .filter((o): o is OrderState => o !== null);

  const orders = {
    active: allOrders.filter((o) => o.status === "active"),
    inactive: allOrders.filter((o) => o.status === "inactive"),
  };

  const allEntries = data
    .filter((d): d is EntryGet => d.kind === "entry")
    .map((e) => {
      if (e.status === "deleted") {
        return null;
      }
      if (!orders.active.map((o) => o.id).includes(e.orderId)) {
        return null;
      }
      return { ...e, status: e.status } as EntryState;
    })
    .filter((e): e is EntryState => e !== null);

  const entries = {
    active: allEntries.filter((e) => e.status === "active"),
    inactive: allEntries.filter((e) => e.status === "inactive"),
  };

  return {
    restaurants,
    orders,
    entries,
  };
};

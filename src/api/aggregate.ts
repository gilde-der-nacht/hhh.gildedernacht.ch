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
  const restaurants = data
    .filter((d): d is RestaurantGet => d.kind === "restaurant")
    .map((r) => {
      if (r.status === "deleted") {
        return null;
      }
      return { ...r, status: r.status } as RestaurantState;
    })
    .filter((r): r is RestaurantState => r !== null);

  const orders = data
    .filter((d): d is OrderGet => d.kind === "order")
    .map((o) => {
      if (o.status === "deleted") {
        return null;
      }
      if (
        !restaurants
          .filter((r) => r.status === "active")
          .map((r) => r.id)
          .includes(o.restaurantId)
      ) {
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

  const entries = data
    .filter((d): d is EntryGet => d.kind === "entry")
    .map((e) => {
      if (e.status === "deleted") {
        return null;
      }
      if (
        !orders
          .filter((o) => o.status === "active")
          .map((o) => o.id)
          .includes(e.orderId)
      ) {
        return null;
      }
      return { ...e, status: e.status } as EntryState;
    })
    .filter((e): e is EntryState => e !== null);

  return { restaurants, orders, entries };
};

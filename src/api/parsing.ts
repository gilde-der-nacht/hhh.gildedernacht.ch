import {
  EntryGet,
  OlympResponse,
  OrderGet,
  RawServerData,
  RestaurantGet,
} from "@api/ApiTypes";
import { HHH_VERSION } from "@api/olymp";
import { DateTime } from "luxon";

export const hasProp = <K extends PropertyKey>(
  data: object,
  prop: K
): data is Record<K, unknown> => {
  return prop in data;
};

export const isRestaurant = (
  o: object
): o is Omit<RestaurantGet, "timestamp"> => {
  if (
    !(
      hasProp(o, "kind") &&
      hasProp(o, "id") &&
      hasProp(o, "label") &&
      hasProp(o, "menuLink") &&
      hasProp(o, "comment") &&
      hasProp(o, "status")
    )
  ) {
    return false;
  }
  if (
    o.kind !== "restaurant" &&
    typeof o.id !== "string" &&
    typeof o.label !== "string" &&
    typeof o.menuLink !== "string" &&
    typeof o.comment !== "string" &&
    (typeof o.status !== "string" ||
      !["active", "inactive", "deleted"].includes(o.status))
  ) {
    return false;
  }
  return true;
};

export const isOrder = (o: object): o is Omit<OrderGet, "timestamp"> => {
  if (
    !(
      hasProp(o, "kind") &&
      hasProp(o, "id") &&
      hasProp(o, "restaurantId") &&
      hasProp(o, "orderer") &&
      hasProp(o, "comment") &&
      hasProp(o, "timeWindow") &&
      hasProp(o, "status")
    )
  ) {
    return false;
  }
  if (
    o.kind !== "order" &&
    typeof o.id !== "string" &&
    typeof o.restaurantId !== "string" &&
    typeof o.orderer !== "string" &&
    typeof o.comment !== "string" &&
    typeof o.timeWindow !== "number" &&
    (typeof o.status !== "string" ||
      !["auto", "active", "inactive", "deleted"].includes(o.status))
  ) {
    return false;
  }
  return true;
};

export const isEntry = (o: object): o is Omit<EntryGet, "timestamp"> => {
  if (
    !(
      hasProp(o, "kind") &&
      hasProp(o, "id") &&
      hasProp(o, "orderId") &&
      hasProp(o, "eater") &&
      hasProp(o, "menuItem") &&
      hasProp(o, "comment") &&
      hasProp(o, "status")
    )
  ) {
    return false;
  }
  if (
    o.kind !== "entry" &&
    typeof o.id !== "string" &&
    typeof o.orderId !== "string" &&
    typeof o.eater !== "string" &&
    typeof o.menuItem !== "string" &&
    typeof o.comment !== "string" &&
    (typeof o.status !== "string" ||
      !["active", "inactive", "deleted"].includes(o.status))
  ) {
    return false;
  }
  return true;
};

export const safeParse = (raw: RawServerData): OlympResponse | null => {
  const parsed = JSON.parse(raw.publicBody) as unknown;
  if (typeof parsed !== "object" || parsed === null) {
    return null;
  }
  if (!hasProp(parsed, "version")) {
    return null;
  }
  if (parsed.version !== HHH_VERSION) {
    return null;
  }
  if (isRestaurant(parsed) || isOrder(parsed) || isEntry(parsed)) {
    return { ...parsed, timestamp: DateTime.fromISO(raw.timestamp) };
  }
  return null;
};

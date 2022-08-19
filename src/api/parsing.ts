import {
  EntryGet,
  OlympResponse,
  OrderGet,
  RawServerData,
  RestaurantGet
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
  return (
    hasProp(o, "kind") &&
    o.kind === "restaurant" &&
    hasProp(o, "id") &&
    hasProp(o, "label") &&
    hasProp(o, "menuLink") &&
    hasProp(o, "comment") &&
    hasProp(o, "status")
  );
};

export const isOrder = (o: object): o is Omit<OrderGet, "timestamp"> => {
  return (
    hasProp(o, "kind") &&
    o.kind === "order" &&
    hasProp(o, "id") &&
    hasProp(o, "restaurantId") &&
    hasProp(o, "orderer") &&
    hasProp(o, "comment") &&
    hasProp(o, "timeWindow") &&
    hasProp(o, "status")
  );
};

export const isEntry = (o: object): o is Omit<EntryGet, "timestamp"> => {
  return (
    hasProp(o, "kind") &&
    o.kind === "entry" &&
    hasProp(o, "id") &&
    hasProp(o, "orderId") &&
    hasProp(o, "eater") &&
    hasProp(o, "menuItem") &&
    hasProp(o, "comment") &&
    hasProp(o, "status")
  );
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

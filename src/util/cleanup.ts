import { DATA_VERSION, ResponseData } from "@util/api";
import { DateTime } from "luxon";
import { AppState, DisplayState, Entry, Order, Restaurant } from "StateType";

type CleanRestaurant = {
  restaurant: {
    id: string;
    label: string;
    menu: string;
    active: boolean;
    timestamp: DateTime;
  };
};

type CleanOrder = {
  order: {
    id: string;
    restaurantId: string;
    orderer: string;
    timeWindow: number;
    active: boolean;
    timestamp: DateTime;
    displayState: DisplayState;
  };
};

type CleanEntry = {
  entry: {
    id: string;
    orderId: string;
    eater: string;
    menuItem: string;
    comment: string;
    active: boolean;
    timestamp: DateTime;
  };
};

const cleanUpRestaurant = (
  r: object,
  timestamp: DateTime
): CleanRestaurant | null => {
  if (
    !r.hasOwnProperty("label") ||
    !r.hasOwnProperty("menu") ||
    !r.hasOwnProperty("active") ||
    !r.hasOwnProperty("id")
  ) {
    return null;
  }

  const { label, menu, active, id } = r as {
    label: string;
    menu: string;
    active: boolean;
    id: string;
  };
  return {
    restaurant: {
      label,
      menu,
      active,
      id,
      timestamp,
    },
  };
};

const cleanUpOrder = (
  o: object,
  timestamp: DateTime,
  now: DateTime
): CleanOrder | null => {
  if (
    !o.hasOwnProperty("restaurantId") ||
    !o.hasOwnProperty("orderer") ||
    !o.hasOwnProperty("timeWindow") ||
    !o.hasOwnProperty("active") ||
    !o.hasOwnProperty("id")
  ) {
    return null;
  }

  const { restaurantId, orderer, timeWindow, active, id } = o as {
    restaurantId: string;
    orderer: string;
    timeWindow: number;
    active: boolean;
    id: string;
  };

  const delta = timestamp
    .plus({ minutes: timeWindow })
    .diff(now, ["hours", "minutes"])
    .toObject() as {
    hours: number;
    minutes: number;
  };
  const displayState: DisplayState =
    delta.minutes >= 0 ? "open" : delta.hours >= -24 ? "closed" : "none";

  return {
    order: {
      restaurantId,
      orderer,
      timeWindow,
      active,
      id,
      timestamp,
      displayState,
    },
  };
};

const cleanUpEntry = (e: object, timestamp: DateTime): CleanEntry | null => {
  if (
    !e.hasOwnProperty("orderId") ||
    !e.hasOwnProperty("id") ||
    !e.hasOwnProperty("eater") ||
    !e.hasOwnProperty("menuItem") ||
    !e.hasOwnProperty("comment") ||
    !e.hasOwnProperty("active")
  ) {
    return null;
  }

  const { orderId, id, eater, menuItem, comment, active } = e as {
    orderId: string;
    id: string;
    eater: string;
    menuItem: string;
    comment: string;
    active: boolean;
  };
  return {
    entry: {
      orderId,
      id,
      eater,
      menuItem,
      comment,
      active,
      timestamp,
    },
  };
};

const filterNewest = (data: ResponseData[]): ResponseData[] => {
  const map: { [_: string]: ResponseData } = {};
  data.forEach((d) => {
    if ("restaurant" in d) {
      map[d.restaurant.id] = d;
    }
    if ("order" in d) {
      map[d.order.id] = d;
    }
    if ("entry" in d) {
      map[d.entry.id] = d;
    }
  });
  return Object.values(map);
};

export const cleanUpResponseData = (
  data: { publicBody: string; timestamp: string }[],
  now: DateTime
): AppState => {
  const list = filterNewest(
    data
      .map((d) => ({
        data: JSON.parse(d.publicBody) as ResponseData,
        timestamp: DateTime.fromISO(d.timestamp),
      }))
      .map((d) => ({ ...d, version: d.data.version }))
      .filter((d) => d.version === DATA_VERSION)
      .map(({ data, timestamp }) => {
        if ("restaurant" in data) {
          return cleanUpRestaurant(data.restaurant, timestamp);
        }
        if ("order" in data) {
          return cleanUpOrder(data.order, timestamp, now);
        }
        if ("entry" in data) {
          return cleanUpEntry(data.entry, timestamp);
        }
        return null;
      })
      .filter((d): d is ResponseData => d !== null)
  );
  return {
    restaurants: list
      .filter((c): c is { restaurant: Restaurant } => "restaurant" in c)
      .map((c) => c.restaurant),
    orders: list
      .filter((o): o is { order: Order } => "order" in o)
      .map((o) => o.order),
    entries: list
      .filter((e): e is { entry: Entry } => "entry" in e)
      .map((e) => e.entry),
  };
};

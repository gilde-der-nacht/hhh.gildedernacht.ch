import { DateTime } from "luxon";
import { DisplayState } from "StateType";
import { ResponseData } from "./api";

type CleanRestaurant = {
  restaurant: {
    label: string;
    menu: string;
    active: boolean;
    id: string;
    timestamp: DateTime;
  };
};

type CleanOrder = {
  order: {
    restaurantId: string;
    orderer: string;
    timeWindow: number;
    active: boolean;
    id: string;
    timestamp: DateTime;
    displayState: DisplayState;
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

const filterNewest = (data: ResponseData[]): ResponseData[] => {
  const map: { [_: string]: ResponseData } = {};
  data.forEach((d) => {
    if ("restaurant" in d) {
      map[d.restaurant.id] = d;
    }
    if ("order" in d) {
      map[d.order.id] = d;
    }
  });
  return Object.values(map);
};

export const cleanUpResponseData = (
  data: { publicBody: string; timestamp: string }[],
  now: DateTime
): ResponseData[] => {
  return filterNewest(
    data
      .map((d) => ({
        data: JSON.parse(d.publicBody),
        timestamp: DateTime.fromISO(d.timestamp),
      }))
      .map(({ data, timestamp }) => {
        if ((data as object).hasOwnProperty("restaurant")) {
          return cleanUpRestaurant(data.restaurant, timestamp);
        }
        if ((data as object).hasOwnProperty("order")) {
          return cleanUpOrder(data.order, timestamp, now);
        }
        return null;
      })
      .filter((d): d is ResponseData => d !== null)
  );
};

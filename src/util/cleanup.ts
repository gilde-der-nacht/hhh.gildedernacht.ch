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
    r.hasOwnProperty("label") &&
    r.hasOwnProperty("menu") &&
    r.hasOwnProperty("active") &&
    r.hasOwnProperty("id")
  ) {
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
  }
  return null;
};

const cleanUpOrder = (o: object, timestamp: DateTime): CleanOrder | null => {
  if (
    o.hasOwnProperty("restaurantId") &&
    o.hasOwnProperty("orderer") &&
    o.hasOwnProperty("timeWindow") &&
    o.hasOwnProperty("active") &&
    o.hasOwnProperty("id")
  ) {
    const { restaurantId, orderer, timeWindow, active, id } = o as {
      restaurantId: string;
      orderer: string;
      timeWindow: number;
      active: boolean;
      id: string;
    };
    return {
      order: {
        restaurantId,
        orderer,
        timeWindow,
        active,
        id,
        timestamp,
        displayState: "open",
      },
    };
  }
  return null;
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
  data: { publicBody: string; timestamp: string }[]
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
          return cleanUpOrder(data.order, timestamp);
        }
        return null;
      })
      .filter((d): d is ResponseData => d !== null)
  );
};

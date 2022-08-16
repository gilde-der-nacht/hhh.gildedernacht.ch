import { DateTime } from "luxon";
import { ResponseData } from "./api";

type cleanRestaurant = {
  restaurant: {
    label: string;
    menu: string;
    active: boolean;
    id: string;
    timestamp: DateTime;
  };
};

const cleanUpRestaurant = (r: object, timestamp: DateTime): cleanRestaurant | null => {
  if (r.hasOwnProperty("label") && r.hasOwnProperty("menu") && r.hasOwnProperty("active") && r.hasOwnProperty("id")) {
    const { label, menu, active, id } = (r as { label: string, menu: string, active: boolean, id: string, });
    return {
      restaurant: {
        label,
        menu,
        active,
        id,
        timestamp,
      }
    };
  }
  return null;
};

const filterNewest = (data: ResponseData[]): ResponseData[] => {
  const map: { [_: string]: ResponseData } = {};
  data.forEach(d => {
    map[d.restaurant.id] = d;
  });
  return Object.values(map);
};

export const cleanUpResponseData = (data: { publicBody: string, timestamp: string }[]): ResponseData[] => {
  return filterNewest(
    data.map((d) => ({
      data: JSON.parse(d.publicBody),
      timestamp: DateTime.fromISO(d.timestamp)
    }))
      .map(({ data, timestamp }) => {
        if ((data as object).hasOwnProperty("restaurant")) {
          return cleanUpRestaurant(data.restaurant, timestamp);
        }
        return null;
      })
      .filter((d): d is ResponseData => d !== null)
  );
}

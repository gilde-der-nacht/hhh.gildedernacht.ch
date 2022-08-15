import { DateTime } from "luxon";
import type { ResponseData } from "./api";

type cleanRestaurant = {
  restaurant: {
    label: string;
    menu: string;
    active: boolean;
    id: string;
    timestamp: DateTime;
  };
};

const cleanUpRestaurant = (r: object, id: string, timestamp: DateTime): cleanRestaurant | null => {
  if (r.hasOwnProperty("label") && r.hasOwnProperty("menu") && r.hasOwnProperty("active")) {
    const { label, menu, active } = (r as { label: string, menu: string, active: boolean });
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
}


export const cleanUpResponseData = (data: { publicBody: string, identification: string, timestamp: string }[]): ResponseData[] => {
  return data.map((d) => ({ data: JSON.parse(d.publicBody), identification: d.identification, timestamp: DateTime.fromISO(d.timestamp) }))
    .map(({ data, identification: id, timestamp }) => {
      try {
        if ((data as object).hasOwnProperty("restaurant")) {
          return cleanUpRestaurant(data.restaurant, id, timestamp);
        }
      } catch (_) {
        return null;
      }
    }).filter((d): d is ResponseData => d !== null);
}

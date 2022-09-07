import { DateTime } from "luxon";

export const isEmpty = (s: string): boolean => {
  return s.trim().length === 0;
};

export const isValidUrl = (s: string): boolean => {
  if (s.trim().length === 0) {
    return false;
  }
  return s.startsWith("https://");
};

export const isPromise = (p: any): p is Promise<any> => {
  return typeof p === "object" && typeof p.then === "function";
};

export const hasProp = <K extends PropertyKey>(
  data: object,
  prop: K
): data is Record<K, unknown> => {
  return prop in data;
};

export const formatDate = (date: DateTime): string =>
  date.setLocale("ch").toLocaleString(DateTime.DATETIME_MED) + " Uhr";

type TimeDelta = { hours: number; minutes: number; seconds: number };

export const getDelta = (first: DateTime, second: DateTime): TimeDelta => {
  return first
    .diff(second, ["hours", "minutes", "seconds"])
    .toObject() as TimeDelta;
};

export const hasBeenUpdated = (o: {
  created: DateTime;
  updated: DateTime;
}): boolean => {
  const delta = getDelta(o.updated, o.created).seconds;
  return delta > 0;
};

import { DateTime } from "luxon";
import type { Order, Restaurant } from "StateType";

export const getRestaurant = (id: string, restaurants: Restaurant[]): Restaurant => {
  const found = restaurants.filter(r => r.id === id);
  if (found.length === 0) {
    throw new Error("Restaurant with id " + id + " not found.");
  }
  return found[0];
}

export const getActiveOrder = (id: string, orders: Order[]): Order | null => {
  const found = orders.filter(o => o.id === id);
  if (found.length === 0) {
    return null;
  }
  return found[0];
}

export const formatDate = (date: DateTime): string => {
  const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  return `${date.day}. ${months[date.month]} ${date.year}, ${date.hour.toString().padStart(2, "0")}.${date.minute.toString().padStart(2, "0")} Uhr`;
}

export const getCountdown = (date: DateTime, timeWindow: number, now: DateTime): string | null => {
  const end = date.plus({ minutes: timeWindow });
  const diff = end.diff(now, ["minutes", "seconds"]).toObject();
  const { seconds, minutes } = diff;
  if (typeof seconds === "undefined" || typeof minutes === "undefined") {
    return null;
  }
  if (seconds <= 0) {
    return null;
  }
  if (minutes > 1) {
    return `${minutes} Minuten`;
  }
  if (minutes === 1) {
    return `${minutes} Minute`;
  }
  return `<1 Minute`;
}

export const isEmpty = (s: string): boolean => {
  return s.trim().length === 0;
}

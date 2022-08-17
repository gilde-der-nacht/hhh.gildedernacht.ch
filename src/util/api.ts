import { DateTime } from "luxon";
import { Setter } from "solid-js";
import { AppState, Order, Restaurant } from "StateType";
import { cleanUpResponseData } from "./cleanup";

const resourceUID =
  "ed28796bac34122c0d508c578915f9fc1ce53ef46789cdcf41a3dc8da76730f3";

type OlympEntry = {
  identification: string;
  publicBody: string;
  privateBody: string;
};

export type ResponseData = { restaurant: Restaurant } | { order: Order };

const post = async (stringified: string): Promise<void> => {
  await fetch(`https://api.gildedernacht.ch/resources/${resourceUID}/entries`, {
    method: "POST",
    mode: "cors",
    body: stringified,
  });
};

const get = async (): Promise<Response> => {
  return await fetch(
    `https://api.gildedernacht.ch/resources/${resourceUID}/entries`,
    { method: "GET", mode: "cors" }
  );
};

export const saveNewRestaurant = async (restaurant: {
  label: string;
  menu: string;
}) => {
  const id = crypto.randomUUID();
  const payload: OlympEntry = {
    identification: id,
    publicBody: JSON.stringify({
      restaurant: { ...restaurant, active: true, id },
    }),
    privateBody: JSON.stringify({}),
  };
  await post(JSON.stringify(payload));
};

export const saveNewOrder = async (order: {
  restaurantId: string;
  orderer: string;
  timeWindow: number;
}) => {
  const id = crypto.randomUUID();
  const payload: OlympEntry = {
    identification: id,
    publicBody: JSON.stringify({ order: { ...order, active: true, id } }),
    privateBody: JSON.stringify({}),
  };
  await post(JSON.stringify(payload));
};

export const saveNewEntry = async (entry: {
  orderId: string;
  eater: string;
  menuItem: string;
  comment: string;
}) => {
  const id = crypto.randomUUID();
  const payload: OlympEntry = {
    identification: id,
    publicBody: JSON.stringify({ entry: { ...entry, active: true, id } }),
    privateBody: JSON.stringify({}),
  };
  await post(JSON.stringify(payload));
};

export const deactivateRestaurant = async (restaurant: Restaurant) => {
  const entry: OlympEntry = {
    identification: restaurant.id,
    publicBody: JSON.stringify({
      restaurant: { ...restaurant, active: false },
    }),
    privateBody: JSON.stringify({}),
  };
  await post(JSON.stringify(entry));
};

export const loadServerData = async (
  setState: Setter<AppState>,
  now: DateTime
) => {
  const response = await get();
  const data = await response.json();
  const cleaned = cleanUpResponseData(data, now);
  setState((prev) => ({
    restaurants: cleaned
      .filter((c): c is { restaurant: Restaurant } => "restaurant" in c)
      .map((c) => c.restaurant),
    orders: cleaned
      .filter((o): o is { order: Order } => "order" in o)
      .map((o) => o.order),
    entries: prev.entries,
  }));
};

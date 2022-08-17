import { DateTime } from "luxon";
import { Setter } from "solid-js";
import { AppState, Entry, Order, Restaurant } from "StateType";
import { cleanUpResponseData } from "./cleanup";

const Resource_UID =
  "ed28796bac34122c0d508c578915f9fc1ce53ef46789cdcf41a3dc8da76730f3";

export const DATA_VERSION = 2;

type RestaurantRequestData = {
  restaurant: {
    id: string;
    label: string;
    menu: string;
    active: boolean;
  };
};

type OrderRequestData = {
  order: {
    id: string;
    restaurantId: string;
    orderer: string;
    timeWindow: number;
    active: boolean;
  };
};

type EntryRequestData = {
  entry: {
    id: string;
    orderId: string;
    eater: string;
    menuItem: string;
    comment: string;
  };
};

type OlympEntry = {
  identification: string;
  publicBody: (RestaurantRequestData | OrderRequestData | EntryRequestData) & {
    version: number;
  };
  privateBody: {};
};

type OlympEntryRequest = {
  identification: string;
  publicBody: string;
  privateBody: string;
};

export type ResponseData = (
  | { restaurant: Restaurant }
  | { order: Order }
  | { entry: Entry }
) & { version?: number };

const post = async (p: OlympEntry): Promise<void> => {
  const body: OlympEntryRequest = {
    identification: p.identification,
    privateBody: JSON.stringify(p.privateBody),
    publicBody: JSON.stringify(p.publicBody),
  };

  await fetch(
    `https://api.gildedernacht.ch/resources/${Resource_UID}/entries`,
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
    }
  );
};

const get = async (): Promise<Response> => {
  return await fetch(
    `https://api.gildedernacht.ch/resources/${Resource_UID}/entries`,
    { method: "GET", mode: "cors" }
  );
};

export const saveNewRestaurant = async (restaurant: {
  label: string;
  menu: string;
}) => {
  const id = crypto.randomUUID();
  const payload = {
    identification: id,
    publicBody: {
      restaurant: { ...restaurant, active: true, id },
      version: DATA_VERSION,
    },
    privateBody: {},
  };
  await post(payload);
};

export const saveNewOrder = async (order: {
  restaurantId: string;
  orderer: string;
  timeWindow: number;
}) => {
  const id = crypto.randomUUID();
  const payload = {
    identification: id,
    publicBody: {
      order: { ...order, active: true, id },
      version: DATA_VERSION,
    },
    privateBody: {},
  };
  await post(payload);
};

export const saveNewEntry = async (entry: {
  orderId: string;
  eater: string;
  menuItem: string;
  comment: string;
}) => {
  const id = crypto.randomUUID();
  const payload = {
    identification: id,
    publicBody: {
      entry: { ...entry, active: true, id },
      version: DATA_VERSION,
    },
    privateBody: {},
  };
  await post(payload);
};

export const deactivateRestaurant = async (restaurant: Restaurant) => {
  const payload = {
    identification: restaurant.id,
    publicBody: {
      restaurant: { ...restaurant, active: false },
      version: DATA_VERSION,
    },
    privateBody: {},
  };
  await post(payload);
};

export const loadServerData = async (
  setState: Setter<AppState>,
  now: DateTime
) => {
  const response = await get();
  const data = await response.json();
  const cleaned = cleanUpResponseData(data, now);

  setState(() => ({
    restaurants: cleaned
      .filter((c): c is { restaurant: Restaurant } => "restaurant" in c)
      .map((c) => c.restaurant),
    orders: cleaned
      .filter((o): o is { order: Order } => "order" in o)
      .map((o) => o.order),
    entries: cleaned
      .filter((e): e is { entry: Entry } => "entry" in e)
      .map((e) => e.entry),
  }));
};

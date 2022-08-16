import { Setter } from "solid-js";
import { AppState, Restaurant } from "StateType";
import { cleanUpResponseData } from "./cleanup";

const resourceUID = "ed28796bac34122c0d508c578915f9fc1ce53ef46789cdcf41a3dc8da76730f3";

type OlympEntry = {
  identification: string;
  publicBody: string;
  privateBody: string;
}

export type ResponseData = { restaurant: Restaurant };

const post = async (stringified: string): Promise<void> => {
  await fetch(`https://api.gildedernacht.ch/resources/${resourceUID}/entries`, { method: "POST", mode: "cors", body: stringified });
}

const get = async (): Promise<Response> => {
  return await fetch(`https://api.gildedernacht.ch/resources/${resourceUID}/entries`, { method: "GET", mode: "cors", });
}

export const saveNewRestaurant = async (restaurant: { label: string, menu: string, active: boolean, }) => {
  const id = crypto.randomUUID();
  const entry: OlympEntry = { identification: id, publicBody: JSON.stringify({ restaurant: { ...restaurant, id } }), privateBody: JSON.stringify({}) };
  await post(JSON.stringify(entry));
}

export const deactivateRestaurant = async (restaurant: Restaurant) => {
  const entry: OlympEntry = { identification: restaurant.id, publicBody: JSON.stringify({ restaurant: { ...restaurant, active: false, } }), privateBody: JSON.stringify({}) };
  await post(JSON.stringify(entry));
}

export const loadServerData = async (setState: Setter<AppState>) => {
  const response = await get();
  const data = await response.json();
  const cleaned = cleanUpResponseData(data);
  setState((prev) => ({ ...prev, restaurants: cleaned.map(c => c.restaurant) }));
}

import { aggragateData } from "@api/aggregate";
import { EntryPost, OrderPost, RestaurantPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";
import { AppState } from "@util/StateTypes";
import { DateTime } from "luxon";
import { Setter } from "solid-js";

const saveNewRestaurant = async (
  restaurant: Omit<RestaurantPost, "status" | "id" | "type">
): Promise<Response> => {
  const id = crypto.randomUUID();
  return OLYMP.POST({
    ...restaurant,
    id,
    status: "active",
    type: "restaurant",
  });
};

const saveNewOrder = async (
  order: Omit<OrderPost, "status" | "id" | "type">
): Promise<Response> => {
  const id = crypto.randomUUID();
  return OLYMP.POST({ ...order, id, status: "active", type: "order" });
};

const saveNewEntry = async (
  entry: Omit<EntryPost, "status" | "id" | "type">
): Promise<Response> => {
  const id = crypto.randomUUID();
  return OLYMP.POST({ ...entry, id, status: "active", type: "entry" });
};

const deactivateRestaurant = async (
  restaurant: Omit<RestaurantPost, "status" | "type">
): Promise<Response> => {
  return OLYMP.POST({ ...restaurant, status: "inactive", type: "restaurant" });
};

export const loadServerData = async (
  setState: Setter<AppState>,
  now: DateTime
): Promise<void> => {
  const data = await OLYMP.GET();
  const appState = aggragateData(data, now);
  setState(appState);
};

export default {
  saveNewRestaurant,
  saveNewOrder,
  saveNewEntry,
  deactivateRestaurant,
};

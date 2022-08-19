import { aggragateData } from "@api/aggregate";
import { EntryPost, OrderPost, RestaurantPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";
import { AppState } from "@util/StateTypes";
import { DateTime } from "luxon";

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

export const loadServerResource = async (now: DateTime): Promise<AppState> => {
  const data = await OLYMP.GET();
  return aggragateData(data, now);
};

export default {
  saveNewRestaurant,
  saveNewOrder,
  saveNewEntry,
  deactivateRestaurant,
};

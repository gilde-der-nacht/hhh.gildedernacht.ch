import { aggragateData } from "@api/aggregate";
import { EntryPost, OrderPost, RestaurantPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";
import { AppState } from "@util/StateTypes";
import { DateTime } from "luxon";

export type Refetcher = (
  info?: unknown
) => AppState | Promise<AppState | undefined> | null | undefined;

const saveNewRestaurant =
  (refetcher: Refetcher) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "id" | "type">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(refetcher)({
      ...restaurant,
      id,
      status: "active",
      type: "restaurant",
    });
  };

const saveNewOrder =
  (refetcher: Refetcher) =>
  async (
    order: Omit<OrderPost, "status" | "id" | "type">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(refetcher)({
      ...order,
      id,
      status: "active",
      type: "order",
    });
  };

const saveNewEntry =
  (refetcher: Refetcher) =>
  async (
    entry: Omit<EntryPost, "status" | "id" | "type">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(refetcher)({
      ...entry,
      id,
      status: "active",
      type: "entry",
    });
  };

const deactivateRestaurant =
  (refetcher: Refetcher) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "type">
  ): Promise<Response> => {
    return OLYMP.POST(refetcher)({
      ...restaurant,
      status: "inactive",
      type: "restaurant",
    });
  };

export const loadServerResource = async (now: DateTime): Promise<AppState> => {
  const data = await OLYMP.GET();
  return aggragateData(data, now);
};

export default (refetcher: Refetcher) => ({
  saveNewRestaurant: saveNewRestaurant(refetcher),
  saveNewOrder: saveNewOrder(refetcher),
  saveNewEntry: saveNewEntry(refetcher),
  deactivateRestaurant: deactivateRestaurant(refetcher),
});

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
    restaurant: Omit<RestaurantPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(refetcher)({
      ...restaurant,
      id,
      status: "active",
      kind: "restaurant",
    });
  };

const saveNewOrder =
  (refetcher: Refetcher) =>
  async (
    order: Omit<OrderPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(refetcher)({
      ...order,
      id,
      status: "active",
      kind: "order",
    });
  };

const saveNewEntry =
  (refetcher: Refetcher) =>
  async (
    entry: Omit<EntryPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(refetcher)({
      ...entry,
      id,
      status: "active",
      kind: "entry",
    });
  };

const deactivateRestaurant =
  (refetcher: Refetcher) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "kind">
  ): Promise<Response> => {
    return OLYMP.POST(refetcher)({
      ...restaurant,
      status: "inactive",
      kind: "restaurant",
    });
  };

const reactivateRestaurant =
  (refetcher: Refetcher) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "kind">
  ): Promise<Response> => {
    return OLYMP.POST(refetcher)({
      ...restaurant,
      status: "active",
      kind: "restaurant",
    });
  };

const deleteRestaurant =
  (refetcher: Refetcher) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "kind">
  ): Promise<Response> => {
    return OLYMP.POST(refetcher)({
      ...restaurant,
      status: "deleted",
      kind: "restaurant",
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
  deleteRestaurant: deleteRestaurant(refetcher),
  reactivateRestaurant: reactivateRestaurant(refetcher),
});

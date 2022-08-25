import { Refetcher } from "@api/api";
import { RestaurantPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";

const create =
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

const deactivate =
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

const reactivate =
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

const remove =
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

export const RestaurantAPI = (refetcher: Refetcher) => ({
  create: create(refetcher),
  deactivate: deactivate(refetcher),
  reactivate: reactivate(refetcher),
  remove: remove(refetcher),
});

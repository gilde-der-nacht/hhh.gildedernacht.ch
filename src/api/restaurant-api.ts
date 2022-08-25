import { ApiProps } from "@api/api";
import { RestaurantPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";

const create =
  (props: ApiProps) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(props.refetch)({
      ...restaurant,
      id,
      status: "active",
      kind: "restaurant",
    });
  };

const deactivate =
  (props: ApiProps) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "kind">
  ): Promise<Response> => {
    return OLYMP.POST(props.refetch)({
      ...restaurant,
      status: "inactive",
      kind: "restaurant",
    });
  };

const reactivate =
  (props: ApiProps) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "kind">
  ): Promise<Response> => {
    return OLYMP.POST(props.refetch)({
      ...restaurant,
      status: "active",
      kind: "restaurant",
    });
  };

const remove =
  (props: ApiProps) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "kind">
  ): Promise<Response> => {
    return OLYMP.POST(props.refetch)({
      ...restaurant,
      status: "deleted",
      kind: "restaurant",
    });
  };

export const RestaurantAPI = (props: ApiProps) => ({
  create: create(props),
  deactivate: deactivate(props),
  reactivate: reactivate(props),
  remove: remove(props),
});

import { ApiProps } from "@api/api";
import { RestaurantPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";

const create =
  (props: ApiProps) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    const promise = OLYMP.POST(props.refetch)({
      ...restaurant,
      id,
      status: "active",
      kind: "restaurant",
    });
    props.setToast({
      visible: true,
      text: "Restaurant speichern ...",
      kind: "loading",
      waitFor: {
        promise,
        onSuccessMessage: "Restaurant gespeichert.",
        onErrorMessage:
          "Restaurant konnte nicht gespeichert werden, bitte versuche es erneut",
      },
    });
    return promise;
  };

const deactivate =
  (props: ApiProps) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "kind">
  ): Promise<Response> => {
    const promise = OLYMP.POST(props.refetch)({
      ...restaurant,
      status: "inactive",
      kind: "restaurant",
    });
    props.setToast({
      visible: true,
      text: "Restaurant deaktivieren ...",
      kind: "loading",
      waitFor: {
        promise,
        onSuccessMessage: "Restaurant deaktiviert.",
        onErrorMessage:
          "Restaurant konnte nicht deaktiviert werden, bitte versuche es erneut",
      },
    });
    return promise;
  };

const reactivate =
  (props: ApiProps) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "kind">
  ): Promise<Response> => {
    const promise = OLYMP.POST(props.refetch)({
      ...restaurant,
      status: "active",
      kind: "restaurant",
    });
    props.setToast({
      visible: true,
      text: "Restaurant reaktivieren ...",
      kind: "loading",
      waitFor: {
        promise,
        onSuccessMessage: "Restaurant reaktiviert.",
        onErrorMessage:
          "Restaurant konnte nicht reaktiviert werden, bitte versuche es erneut",
      },
    });
    return promise;
  };

const remove =
  (props: ApiProps) =>
  async (
    restaurant: Omit<RestaurantPost, "status" | "kind">
  ): Promise<Response> => {
    const promise = OLYMP.POST(props.refetch)({
      ...restaurant,
      status: "deleted",
      kind: "restaurant",
    });
    props.setToast({
      visible: true,
      text: "Restaurant löschen ...",
      kind: "loading",
      waitFor: {
        promise,
        onSuccessMessage: "Restaurant gelöscht.",
        onErrorMessage:
          "Restaurant konnte nicht gelöscht werden, bitte versuche es erneut",
      },
    });
    return promise;
  };

export const RestaurantAPI = (props: ApiProps) => ({
  create: create(props),
  deactivate: deactivate(props),
  reactivate: reactivate(props),
  remove: remove(props),
});

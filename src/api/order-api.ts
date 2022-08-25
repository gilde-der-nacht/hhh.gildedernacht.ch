import { ApiProps } from "@api/api";
import { OrderPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";

const create =
  (props: ApiProps) =>
  async (
    order: Omit<OrderPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    const promise = OLYMP.POST(props.refetch)({
      ...order,
      id,
      status: "auto",
      kind: "order",
    });
    props.setToast({
      visible: true,
      text: "Bestellung speichern ...",
      kind: "loading",
      waitFor: {
        promise,
        onSuccessMessage: "Bestellung gespeichert.",
        onErrorMessage:
          "Bestellung konnte nicht gespeichert werden, bitte versuche es erneut",
      },
    });
    return promise;
  };

export const OrderAPI = (props: ApiProps) => ({
  create: create(props),
});

import { ApiProps } from "@api/api";
import { OrderPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";

const create =
  (props: ApiProps) =>
  async (
    order: Omit<OrderPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(props.refetch)({
      ...order,
      id,
      status: "auto",
      kind: "order",
    });
  };

export const OrderAPI = (props: ApiProps) => ({
  create: create(props),
});

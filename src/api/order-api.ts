import { Refetcher } from "@api/api";
import { OrderPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";

const create =
  (refetcher: Refetcher) =>
  async (
    order: Omit<OrderPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(refetcher)({
      ...order,
      id,
      status: "auto",
      kind: "order",
    });
  };

export const OrderAPI = (refetcher: Refetcher) => ({
  create: create(refetcher),
});

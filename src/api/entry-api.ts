import { Refetcher } from "@api/api";
import { EntryPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";

const create =
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

export const EntryAPI = (refetcher: Refetcher) => ({
  create: create(refetcher),
});

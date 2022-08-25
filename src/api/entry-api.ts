import { ApiProps } from "@api/api";
import { EntryPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";

const create =
  (props: ApiProps) =>
  async (
    entry: Omit<EntryPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    return OLYMP.POST(props.refetch)({
      ...entry,
      id,
      status: "active",
      kind: "entry",
    });
  };

export const EntryAPI = (props: ApiProps) => ({
  create: create(props),
});

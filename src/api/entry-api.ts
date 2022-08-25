import { ApiProps } from "@api/api";
import { EntryPost } from "@api/ApiTypes";
import OLYMP from "@api/olymp";

const create =
  (props: ApiProps) =>
  async (
    entry: Omit<EntryPost, "status" | "id" | "kind">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    const promise = OLYMP.POST(props.refetch)({
      ...entry,
      id,
      status: "active",
      kind: "entry",
    });
    props.setToast({
      visible: true,
      text: "Eintrag speichern ...",
      kind: "loading",
      waitFor: {
        promise,
        onSuccessMessage: "Eintrag gespeichert.",
        onErrorMessage:
          "Eintrag konnte nicht gespeichert werden, bitte versuche es erneut",
      },
    });
    return promise;
  };

export const EntryAPI = (props: ApiProps) => ({
  create: create(props),
});

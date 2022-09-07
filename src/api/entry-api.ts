import { ApiProps } from "@api/api";

import OLYMP from "@api/olymp";
import { EntryBase } from "@util/BasicTypes";

const create =
  (props: ApiProps) =>
  async (
    entry: Omit<EntryBase, "kind" | "id" | "created" | "updated">
  ): Promise<Response> => {
    const id = crypto.randomUUID();
    const promise = OLYMP.CREATE(props.refetch)({
      ...entry,
      id,
      status: "active",
      kind: "entry",
    });
    props.setToast({
      isVisible: true,
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

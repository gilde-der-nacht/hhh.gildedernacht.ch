import { mergeProps, ParentComponent } from "solid-js";

export type NotificationKind = "success" | "danger" | "info";

type Props = {
  kind?: NotificationKind;
  isLight?: boolean;
};

export const Notification: ParentComponent<Props> = (props) => {
  const merged = mergeProps({ type: "info", isLight: true }, props);

  return (
    <div
      class={`notification is-${merged.kind}`}
      classList={{
        "is-light": merged.isLight,
      }}
    >
      {merged.children}
    </div>
  );
};

import { Component, JSX, mergeProps } from "solid-js";

export type NotificationKind = "success" | "danger" | "info";

type NotificationProps = {
  kind?: NotificationKind;
  isLight?: boolean;
  children: JSX.Element;
};

export const Notification: Component<NotificationProps> = (props) => {
  const merged = mergeProps({ type: "info", isLight: true }, props);

  return (
    <div
      classList={{
        notification: true,
        [`is-${merged.kind}`]: true,
        "is-light": merged.isLight,
      }}
    >
      {merged.children}
    </div>
  );
};

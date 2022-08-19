import { Component, JSX, mergeProps } from "solid-js";

export type NotificationType = "success" | "danger" | "info";

type NotificationProps = {
  type?: NotificationType;
  isLight?: boolean;
  children: JSX.Element;
};

export const Notification: Component<NotificationProps> = (props) => {
  const merged = mergeProps({ type: "info", isLight: true }, props);

  return (
    <div
      classList={{
        notification: true,
        [`is-${merged.type}`]: true,
        "is-light": merged.isLight,
      }}
    >
      {merged.children}
    </div>
  );
};

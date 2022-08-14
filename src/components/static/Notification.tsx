import type { Component, JSX } from "solid-js";

type NotificationProps = {
  color: "danger";
  children: JSX.Element;
};

export const Notification: Component<NotificationProps> = ({
  color,
  children,
}) => {
  return <div class={`notification is-${color} is-light`}>{children}</div>;
};

import { Component, JSX } from "solid-js";

type NotificationProps = {
  color: "danger";
  children: JSX.Element;
};

export const Notification: Component<NotificationProps> = (props) => {
  return (
    <div
      classList={{
        notification: true,
        [`is-${props.color}`]: true,
        "is-light": true,
      }}
    >
      {props.children}
    </div>
  );
};

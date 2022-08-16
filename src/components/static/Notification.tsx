import { Component, JSX } from "solid-js";

type NotificationProps = {
  color: "danger";
  children: JSX.Element;
};

export const Notification: Component<NotificationProps> = (props) => {
  return (
    <div class={`notification is-${props.color} is-light`}>
      {props.children}
    </div>
  );
};

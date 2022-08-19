import { Component } from "solid-js";

export type IconType =
  | "plus"
  | "check"
  | "trash"
  | "arrow-left"
  | "spinner-third"
  | "square-info"
  | "square-exclamation"
  | "square-check";

type IconProps = {
  icon: IconType;
};

export const Icon: Component<IconProps> = (props) => {
  return (
    <span class="icon">
      <i classList={{ fas: true, [`fa-${props.icon}`]: true }}></i>
    </span>
  );
};

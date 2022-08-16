import { Component } from "solid-js";

export type IconType = "plus" | "check" | "trash" | "arrow-left";

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

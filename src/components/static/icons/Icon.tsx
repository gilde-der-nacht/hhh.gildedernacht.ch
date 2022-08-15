import type { Component } from "solid-js";

export type IconType = "plus" | "check" | "trash" | "arrow-left";

type IconProps = {
  icon: IconType;
};

export const Icon: Component<IconProps> = (props) => {
  return (
    <span class="icon">
      <i class={`fas fa-${props.icon}`}></i>
    </span>
  );
};

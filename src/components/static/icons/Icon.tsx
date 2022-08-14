import { Component } from "solid-js";

export type IconType = "plus" | "check" | "trash" | "arrow-left";

type IconProps = {
  icon: IconType;
};

export const Icon: Component<IconProps> = ({ icon }) => {
  return (
    <span class="icon">
      <i class={`fas fa-${icon}`}></i>
    </span>
  );
};

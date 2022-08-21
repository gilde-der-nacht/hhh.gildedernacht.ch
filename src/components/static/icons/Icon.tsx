import { Component, JSX } from "solid-js";

export type IconType =
  | "plus"
  | "check"
  | "trash"
  | "arrow-left"
  | "spinner-third"
  | "square-info"
  | "square-exclamation"
  | "square-check"
  | "bars-staggered"
  | "fork-knife"
  | "receipt";

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

type IconLeftProps = {
  icon: IconType;
  children: JSX.Element;
};

export const IconLeft: Component<IconLeftProps> = (props) => {
  return (
    <>
      <Icon icon={props.icon} /> <span>{props.children}</span>
    </>
  );
};

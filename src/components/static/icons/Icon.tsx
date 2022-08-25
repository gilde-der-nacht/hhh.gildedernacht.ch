import { Component, ParentComponent } from "solid-js";

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
  | "octagon-minus"
  | "octagon-plus"
  | "circle-stop"
  | "circle-play"
  | "receipt";

type Props = {
  icon: IconType;
};

export const Icon: Component<Props> = (props) => {
  return (
    <span class="icon">
      <i classList={{ fas: true, [`fa-${props.icon}`]: true }}></i>
    </span>
  );
};

export const IconLeft: ParentComponent<Props> = (props) => {
  return (
    <>
      <Icon icon={props.icon} /> <span>{props.children}</span>
    </>
  );
};

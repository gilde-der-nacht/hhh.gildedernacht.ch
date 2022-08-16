import { Component, JSX } from "solid-js";
import { Icon, IconType } from "./Icon";

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

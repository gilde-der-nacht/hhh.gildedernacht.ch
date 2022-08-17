import { Icon, IconType } from "@components/static/icons/Icon";
import { Component, JSX } from "solid-js";

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

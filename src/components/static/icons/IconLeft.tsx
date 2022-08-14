import { Component, JSX } from "solid-js";
import type { IconType } from "./Icon";
import { Icon } from "./Icon";

type IconLeftProps = {
  icon: IconType;
  children: JSX.Element;
};

export const IconLeft: Component<IconLeftProps> = ({ icon, children }) => {
  return (
    <>
      <Icon icon={icon} /> <span>{children}</span>
    </>
  );
};

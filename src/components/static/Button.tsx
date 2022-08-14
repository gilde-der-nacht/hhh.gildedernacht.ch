import type { Component, JSX } from "solid-js";

type ButtonProps = {
  color?: "primary" | "success";
  children: JSX.Element;
  onClick: () => void;
};

export const Button: Component<ButtonProps> = ({
  color = "primary",
  children,
  onClick,
}) => {
  return (
    <button class={`button is-${color}`} onClick={onClick}>
      {children}
    </button>
  );
};

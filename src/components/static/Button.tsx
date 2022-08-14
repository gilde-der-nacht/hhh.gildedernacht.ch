import type { Component, JSX } from "solid-js";

type ButtonProps = {
  color?: "primary" | "success" | "danger";
  outlined?: boolean;
  size?: "normal" | "large";
  children: JSX.Element;
  onClick: (e: Event) => void;
};

export const Button: Component<ButtonProps> = ({
  color = "primary",
  outlined = false,
  size = "normal",
  children,
  onClick,
}) => {
  return (
    <button
      class={`button is-${color} ${outlined ? "is-outlined" : ""}
      ${size === "large" ? "is-medium" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

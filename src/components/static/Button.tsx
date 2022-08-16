import { Component, JSX } from "solid-js";

type ButtonProps = {
  color?: "primary" | "success" | "danger";
  outlined?: boolean;
  size?: "normal" | "large";
  children: JSX.Element;
  onClick: (e: Event) => void;
};

export const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      class={`button is-${props.color} ${props.outlined ? "is-outlined" : ""}
      ${props.size === "large" ? "is-medium" : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

import { Component, JSX, mergeProps } from "solid-js";

type ButtonProps = {
  color?: "primary" | "success" | "danger";
  outlined?: boolean;
  large?: boolean;
  onClick: (e: Event) => void;
  children: JSX.Element;
};

export const Button: Component<ButtonProps> = (props) => {
  const merged = mergeProps(
    { color: "primary", outlined: false, large: false },
    props
  );

  return (
    <button
      classList={{
        button: true,
        [`is-${merged.color}`]: true,
        "is-outlined": merged.outlined,
        "is-medium": merged.large,
      }}
      onClick={merged.onClick}
    >
      {merged.children}
    </button>
  );
};

import type { Component, JSX } from "solid-js";

type CardProps = {
  isDisabled?: boolean;
  children: JSX.Element;
};

export const Card: Component<CardProps> = (props) => {
  return (
    <div class={`card ${props.isDisabled === true ? "hhh-card-disabled" : ""}`}>
      <div class="card-content">
        <div class="content">{props.children}</div>
      </div>
    </div>
  );
};

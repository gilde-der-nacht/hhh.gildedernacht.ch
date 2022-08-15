import type { Component, JSX } from "solid-js";

type CardProps = {
  children: JSX.Element;
};

export const Card: Component<CardProps> = ({ children }) => {
  return (
    <div class="card">
      <div class="card-content">
        <div class="content">{children}</div>
      </div>
    </div>
  );
};

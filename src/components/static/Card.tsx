import { Component, JSX, mergeProps } from "solid-js";

type CardProps = {
  isDisabled?: boolean;
  children: JSX.Element;
};

export const Card: Component<CardProps> = (props) => {
  const merged = mergeProps({ isDisabled: false }, props);

  return (
    <div classList={{ card: true, "hhh-card-disabled": merged.isDisabled }}>
      <div class="card-content">
        <div class="content">{merged.children}</div>
      </div>
    </div>
  );
};

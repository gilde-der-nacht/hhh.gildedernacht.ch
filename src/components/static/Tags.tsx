import { Component, For, mergeProps } from "solid-js";

type Tag = {
  label: string;
  kind?: "success" | "danger";
};

type Props = {
  isJustified?: boolean;
  tags: Tag[];
};

export const Tags: Component<Props> = (props) => {
  const merged = mergeProps({ isJustified: false }, props);

  return (
    <div
      class="tags"
      classList={{ "is-justify-content-center": merged.isJustified }}
    >
      <For each={merged.tags}>
        {(tag) => <span class={`tag is-${tag.kind ?? ""}`}>{tag.label}</span>}
      </For>
    </div>
  );
};

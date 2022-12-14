import { Component, For, mergeProps, Show } from "solid-js";

export type Tag = {
  label: string;
  kind?: "success" | "danger";
  link?: string;
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
        {(tag) => (
          <span class={`tag is-${tag.kind ?? ""}`}>
            <Show when={tag.link?.length} fallback={tag.label}>
              <a href={tag.link}>{tag.label}</a>
            </Show>
          </span>
        )}
      </For>
    </div>
  );
};

import type { Component, JSX } from "solid-js";
import { For, Show } from "solid-js";

type GridProps<T> = {
  each: readonly T[];
  footer?: (item: T) => GridElementFooter[];
  children: (item: T) => JSX.Element;
};

export const Grid = <T,>({
  each,
  children,
  footer = () => [],
}: GridProps<T>): JSX.Element => {
  return (
    <div class="hhh-grid">
      <For each={each}>
        {(item) => (
          <GridElement footer={footer(item)}>{children(item)}</GridElement>
        )}
      </For>
    </div>
  );
};

type GridElementFooter = { label: string; onClick: () => void };

type GridElementProps = {
  footer?: GridElementFooter[];
  children: JSX.Element;
};

const GridElement: Component<GridElementProps> = ({
  children,
  footer = [],
}) => {
  return (
    <div class="card">
      <div class="card-content">{children}</div>
      <Show when={footer.length > 0}>
        <footer class="card-footer"></footer>
        <For each={footer}>
          {(entry) => (
            <a class="card-footer-item" onClick={entry.onClick}>
              {entry.label}
            </a>
          )}
        </For>
      </Show>
    </div>
  );
};

import type { Component, JSX } from "solid-js";
import { For, Show } from "solid-js";

type GridProps<T> = {
  each: readonly T[];
  footer?: (item: T) => GridElementFooter[];
  children: (item: T) => JSX.Element;
};

export const Grid = <T,>(props: GridProps<T>): JSX.Element => {
  return (
    <div class="hhh-grid">
      <For each={props.each}>
        {(item) => (
          <GridElement footer={props.footer && props.footer(item)}>
            {props.children(item)}
          </GridElement>
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

const GridElement: Component<GridElementProps> = (props) => {
  return (
    <div class="card">
      <div class="card-content">{props.children}</div>
      <Show when={props.footer && props.footer.length > 0}>
        <footer class="card-footer"></footer>
        <For each={props.footer}>
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

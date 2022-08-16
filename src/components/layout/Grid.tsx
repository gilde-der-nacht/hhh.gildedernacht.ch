import { Component, Index, JSX, Show } from "solid-js";

type GridProps<T> = {
  each: readonly T[];
  footer?: (item: T) => GridElementFooter[];
  children: (item: T) => JSX.Element;
};

export const Grid = <T,>(props: GridProps<T>): JSX.Element => {
  return (
    <div class="hhh-grid">
      <Index each={props.each}>
        {(item) => (
          <GridElement footer={props.footer && props.footer(item())}>
            {props.children(item())}
          </GridElement>
        )}
      </Index>
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
        <Index each={props.footer}>
          {(entry) => (
            <a class="card-footer-item" onClick={entry().onClick}>
              {entry().label}
            </a>
          )}
        </Index>
      </Show>
    </div>
  );
};

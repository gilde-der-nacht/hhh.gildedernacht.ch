import { For, JSX, mergeProps, ParentComponent, Show } from "solid-js";

type GridProps<T> = {
  each: readonly T[];
  footer?: (item: T) => GridElementFooter[];
  children: (item: T) => JSX.Element;
};

export const Grid = <T,>(props: GridProps<T>): JSX.Element => {
  const merged = mergeProps({ footer: () => [] }, props);

  return (
    <div class="hhh-grid">
      <For each={merged.each}>
        {(item) => (
          <GridElement footer={merged.footer(item)}>
            {merged.children(item)}
          </GridElement>
        )}
      </For>
    </div>
  );
};

export type GridElementFooter = {
  label: JSX.Element;
  onClick: () => void;
  kind?: "danger" | "success";
};

type GridElementProps = {
  footer?: GridElementFooter[];
};

const GridElement: ParentComponent<GridElementProps> = (props) => {
  const merged = mergeProps({ footer: [] }, props);

  return (
    <div class="card hhh-card">
      <div class="card-content">{merged.children}</div>
      <Show when={merged.footer.length > 0}>
        <footer class="card-footer hhh-card-footer">
          <For each={merged.footer}>
            {(entry) => (
              <a
                class="card-footer-item"
                classList={{
                  [`has-text-${entry.kind}`]: typeof entry.kind === "string",
                }}
                onClick={entry.onClick}
              >
                {entry.label}
              </a>
            )}
          </For>
        </footer>
      </Show>
    </div>
  );
};

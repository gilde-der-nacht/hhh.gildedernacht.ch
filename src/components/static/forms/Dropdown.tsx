import { Component, For, mergeProps } from "solid-js";

type DropdownProps = {
  hasErrors?: boolean;
  entries: { label: string; value: string }[];
  updateValue: (value: string) => void;
};

export const Dropdown: Component<DropdownProps> = (props) => {
  const merged = mergeProps({ hasErrors: false }, props);

  const onChange = (e: Event) =>
    merged.updateValue((e.target as HTMLSelectElement).value);
  return (
    <div class="control">
      <div classList={{ select: true, "is-danger": props.hasErrors }}>
        <select onChange={onChange}>
          <For each={merged.entries}>
            {(entry) => <option value={entry.value}>{entry.label}</option>}
          </For>
        </select>
      </div>
    </div>
  );
};

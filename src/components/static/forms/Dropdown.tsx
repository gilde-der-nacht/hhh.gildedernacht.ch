import { For } from "solid-js";
import type { Component } from "solid-js";

type DropdownProps = {
  entries: string[];
};

export const Dropdown: Component<DropdownProps> = ({ entries }) => {
  return (
    <div class="control">
      <div class="select">
        <select>
          <For each={entries}>{(entry) => <option>{entry}</option>}</For>
        </select>
      </div>
    </div>
  );
};

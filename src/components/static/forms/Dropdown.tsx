import { Component, Index } from "solid-js";

type DropdownProps = {
  entries: string[];
};

export const Dropdown: Component<DropdownProps> = (props) => {
  return (
    <div class="control">
      <div class="select">
        <select>
          <Index each={props.entries}>
            {(entry) => <option>{entry()}</option>}
          </Index>
        </select>
      </div>
    </div>
  );
};

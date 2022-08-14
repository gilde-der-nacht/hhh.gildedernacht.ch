import type { Component } from "solid-js";

export const Dropdown: Component = () => {
  return (
    <div class="control">
      <div class="select">
        <select>
          <option>Select dropdown</option>
          <option>With options</option>
        </select>
      </div>
    </div>
  );
};

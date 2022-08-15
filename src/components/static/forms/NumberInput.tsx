import type { Component } from "solid-js";

type InputProps = {
  label: string;
  startValue: number;
  helptext: string;
};

export const NumberInput: Component<InputProps> = (props) => {
  return (
    <div class="field">
      <label class="label">{props.label}</label>
      <div class="control">
        <input class="input" type="number" value={props.startValue} />
      </div>
      <p class="help">{props.helptext}</p>
    </div>
  );
};

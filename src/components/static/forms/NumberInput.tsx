import type { Component } from "solid-js";

type InputProps = {
  label: string;
  startValue: number;
  helptext: string;
};

export const NumberInput: Component<InputProps> = ({
  label,
  startValue,
  helptext,
}) => {
  return (
    <div class="field">
      <label class="label">{label}</label>
      <div class="control">
        <input class="input" type="number" value={startValue} />
      </div>
      <p class="help">{helptext}</p>
    </div>
  );
};

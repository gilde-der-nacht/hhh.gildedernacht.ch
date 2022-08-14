import type { Component } from "solid-js";

type InputProps = {
  label: string;
  placeholder: string;
  helptext: string;
};

export const Input: Component<InputProps> = ({
  label,
  placeholder,
  helptext,
}) => {
  return (
    <div class="field">
      <label class="label">{label}</label>
      <div class="control">
        <input class="input" type="text" placeholder={placeholder} />
      </div>
      <p class="help">{helptext}</p>
    </div>
  );
};

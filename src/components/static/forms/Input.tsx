import { Component, Show } from "solid-js";

type InputProps = {
  label: string;
  placeholder: string;
  helpText: string;
  error?: { status: boolean; text?: string };
  setter?: (content: string) => void;
};

export const Input: Component<InputProps> = (props) => {
  return (
    <div class="field">
      <label class="label">{props.label}</label>
      <div class={`control ${props.error?.status ? "has-icons-right" : ""}`}>
        <input
          class={`input ${props.error?.status ? "is-danger" : ""}`}
          type="text"
          placeholder={props.placeholder}
          onInput={(e) =>
            props.setter && props.setter((e.target as HTMLInputElement).value)
          }
        />
        <Show when={props.error?.status}>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </Show>
      </div>
      <Show when={props.error?.status}>
        <p class="help is-danger">{props.error?.text}</p>
      </Show>
      <p class="help">{props.helpText}</p>
    </div>
  );
};

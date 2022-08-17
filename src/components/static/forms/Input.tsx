import { Component, mergeProps, Show } from "solid-js";

type InputProps = {
  label: string;
  placeholder: string;
  helpText?: string;
  required?: boolean;
  isUrl?: boolean;
  error?: { status: boolean; text?: string };
  setter?: (content: string) => void;
};

export const Input: Component<InputProps> = (props) => {
  const merged = mergeProps(
    {
      error: { status: false, text: "" },
      setter: () => {},
      isUrl: false,
      required: true,
    },
    props
  );

  return (
    <div class="field">
      <label class="label">{merged.label}</label>
      <div
        classList={{ control: true, "has-icons-right": merged.error.status }}
      >
        <input
          classList={{ input: true, "is-danger": merged.error.status }}
          type={merged.isUrl ? "url" : "text"}
          required={merged.required}
          placeholder={merged.placeholder}
          pattern={merged.isUrl ? "https://.*" : ""}
          onInput={(e) => merged.setter((e.target as HTMLInputElement).value)}
        />
        <Show when={merged.error.status}>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </Show>
      </div>
      <Show when={merged.error.status}>
        <p class="help is-danger">{merged.error.text}</p>
      </Show>
      <Show when={merged.helpText}>
        <p class="help">{merged.helpText}</p>
      </Show>
    </div>
  );
};

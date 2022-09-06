import { Component, mergeProps, Show } from "solid-js";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  helpText?: string;
  isRequired?: boolean;
  isUrl?: boolean;
  error?: { status: boolean; text?: string };
  setter?: (content: string) => void;
};

export const Input: Component<Props> = (props) => {
  const merged = mergeProps(
    {
      error: { status: false, text: "" },
      setter: () => {},
      isUrl: false,
      isRequired: true,
    },
    props
  );

  return (
    <div class="field">
      <label class="label">{merged.label}</label>
      <div
        class="control"
        classList={{ "has-icons-right": merged.error.status }}
      >
        <input
          class="input"
          classList={{ "is-danger": merged.error.status }}
          type={merged.isUrl ? "url" : "text"}
          required={merged.isRequired}
          placeholder={merged.placeholder}
          pattern={merged.isUrl ? "https://.*" : ""}
          value={merged.value}
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

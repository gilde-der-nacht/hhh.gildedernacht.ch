import { Component, mergeProps, Show } from "solid-js";

type InputProps = {
  label: string;
  placeholder: string;
  helpText: string;
  error?: { status: boolean; text?: string };
  setter?: (content: string) => void;
};

export const Input: Component<InputProps> = (props) => {
  const merged = mergeProps(
    { error: { status: false, text: "" }, setter: () => {} },
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
          type="text"
          placeholder={merged.placeholder}
          onInput={(e) =>
            merged.setter && merged.setter((e.target as HTMLInputElement).value)
          }
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
      <p class="help">{merged.helpText}</p>
    </div>
  );
};

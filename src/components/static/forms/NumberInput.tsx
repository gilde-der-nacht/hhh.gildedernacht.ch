import { Component, mergeProps, Show } from "solid-js";

type InputProps = {
  label: string;
  startValue: number;
  helptext: string;
  error?: { status: boolean; text?: string };
  setter?: (content: number) => void;
};

export const NumberInput: Component<InputProps> = (props) => {
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
          type="number"
          min={0}
          step={1}
          value={merged.startValue}
          onInput={(e) =>
            merged.setter(
              Math.floor(Number((e.target as HTMLInputElement).value))
            )
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
      <p class="help">{merged.helptext}</p>
    </div>
  );
};

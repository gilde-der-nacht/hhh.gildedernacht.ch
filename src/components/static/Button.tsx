import { mergeProps, ParentComponent } from "solid-js";

type Props = {
  color?: "primary" | "success" | "danger" | "warning";
  outlined?: boolean;
  large?: boolean;
  isSubmit?: boolean;
  onClick: (e: Event) => void;
};

export const Button: ParentComponent<Props> = (props) => {
  const merged = mergeProps(
    { color: "primary", outlined: false, large: false, isSubmit: false },
    props
  );

  return (
    <button
      type={merged.isSubmit ? "submit" : "button"}
      class={`button is-${merged.color}`}
      classList={{
        "is-outlined": merged.outlined,
        "is-medium": merged.large,
      }}
      onClick={merged.onClick}
    >
      {merged.children}
    </button>
  );
};

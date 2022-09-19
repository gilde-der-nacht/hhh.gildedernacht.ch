import { mergeProps, ParentComponent } from "solid-js";

type Props = {
  title?: string;
  color?: "primary" | "success" | "danger" | "warning";
  isOutlined?: boolean;
  isLarge?: boolean;
  isSubmit?: boolean;
  onClick: (e: Event) => void;
};

export const Button: ParentComponent<Props> = (props) => {
  const merged = mergeProps(
    { color: "primary", isOutlined: false, isLarge: false, isSubmit: false },
    props
  );

  return (
    <button
      type={merged.isSubmit ? "submit" : "button"}
      title={merged.title}
      class={`button is-${merged.color}`}
      classList={{
        "is-outlined": merged.isOutlined,
        "is-medium": merged.isLarge,
      }}
      onClick={merged.onClick}
    >
      {merged.children}
    </button>
  );
};

import { mergeProps, ParentComponent } from "solid-js";

type Props = {
  isDisabled?: boolean;
};

export const Card: ParentComponent<Props> = (props) => {
  const merged = mergeProps({ isDisabled: false }, props);

  return (
    <div classList={{ card: true, "hhh-card-disabled": merged.isDisabled }}>
      <div class="card-content">
        <div class="content">{merged.children}</div>
      </div>
    </div>
  );
};

import { Tag, Tags } from "@components/static/Tags";
import { mergeProps, ParentComponent } from "solid-js";

type Props = {
  isDisabled?: boolean;
  showStatusTag?: boolean;
  tags?: Tag[];
};

export const Card: ParentComponent<Props> = (props) => {
  const merged = mergeProps(
    { isDisabled: false, showStatusTag: true, tags: [] },
    props
  );
  const tags: Tag[] = [];
  if (merged.showStatusTag) {
    tags.push({
      label: merged.isDisabled ? "inaktiv" : "aktiv",
      kind: merged.isDisabled ? "danger" : "success",
    });
  }
  tags.push(...merged.tags);

  return (
    <div class="card" classList={{ "hhh-card-disabled": merged.isDisabled }}>
      <div class="card-content">
        <div class="content">{merged.children}</div>
        <Tags tags={tags} />
      </div>
    </div>
  );
};

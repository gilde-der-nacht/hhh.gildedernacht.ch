import { Card } from "@components/static/Card";
import { Tag } from "@components/static/Tags";
import { EntryState } from "@util/StateTypes";
import { formatDate, hasBeenUpdated } from "@util/utils";
import { ParentComponent, Show } from "solid-js";

type Props = {
  entry: EntryState;
  isDisabled: boolean;
};

export const EntryListItem: ParentComponent<Props> = (props) => {
  const tags: Tag[] = [
    { label: `Erstellt: ${formatDate(props.entry.created)}` },
  ];

  if (hasBeenUpdated(props.entry)) {
    tags.push({ label: `Bearbeitet: ${formatDate(props.entry.updated)}` });
  }

  return (
    <Card isDisabled={props.isDisabled} tags={tags}>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
        <div>
          <h5 class="m-0">{props.entry.menuItem}</h5>
          <p class="is-italic">{props.entry.eater}</p>
          <Show when={props.entry.comment.trim().length > 0}>
            <p class="is-italic">{props.entry.comment}</p>
          </Show>
        </div>
        {props.children}
      </div>
    </Card>
  );
};

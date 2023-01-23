import { Card } from "@components/static/Card";
import { Tag } from "@components/static/Tags";
import { RestaurantState } from "@util/StateTypes";
import { formatDate, hasBeenUpdated } from "@util/utils";
import { ParentComponent, Show } from "solid-js";

type Props = {
  restaurant: RestaurantState;
  isDisabled: boolean;
};

export const RestaurantListItem: ParentComponent<Props> = (props) => {
  const tags: Tag[] = [
    { label: `Erstellt: ${formatDate(props.restaurant.created)}` },
  ];

  if (hasBeenUpdated(props.restaurant)) {
    tags.push({ label: `Bearbeitet: ${formatDate(props.restaurant.updated)}` });
  }

  return (
    <Card isDisabled={props.isDisabled} tags={tags}>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
        <div>
          <h5 class="m-0">{props.restaurant.label}</h5>
          <p class="is-italic">
            <a href={props.restaurant.menuLink} target="_blank">{props.restaurant.menuLink}</a>
          </p>
          <Show when={props.restaurant.comment.trim().length > 0}>
            <p class="is-italic">{props.restaurant.comment}</p>
          </Show>
        </div>
        {props.children}
      </div>
    </Card>
  );
};

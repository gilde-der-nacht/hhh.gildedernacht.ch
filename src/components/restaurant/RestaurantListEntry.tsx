import { Card } from "@components/static/Card";
import { Tags } from "@components/static/Tags";
import { RestaurantState } from "@util/StateTypes";
import { formatDate } from "@util/utils";
import { ParentComponent, Show } from "solid-js";

type Props = {
  restaurant: RestaurantState;
  isDisabled: boolean;
};

export const RestaurantListEntry: ParentComponent<Props> = (props) => {
  return (
    <Card isDisabled={props.isDisabled}>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
        <div>
          <h5 class="m-0">{props.restaurant.label}</h5>
          <p class="is-italic">
            <a href={props.restaurant.menuLink}>{props.restaurant.menuLink}</a>
          </p>
          <Show when={props.restaurant.comment.trim().length > 0}>
            <p class="is-italic">{props.restaurant.comment}</p>
          </Show>
          <Tags
            tags={[
              { label: `Erstellt: ${formatDate(props.restaurant.created)}` },
            ]}
          />
        </div>
        {props.children}
      </div>
    </Card>
  );
};

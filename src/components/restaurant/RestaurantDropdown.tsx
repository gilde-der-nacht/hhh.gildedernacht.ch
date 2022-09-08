import { Dropdown } from "@components/static/forms/Dropdown";
import { Tag, Tags } from "@components/static/Tags";
import { RestaurantState } from "@util/StateTypes";
import { mergeProps, ParentComponent, Show } from "solid-js";

type Props = {
  activeRestaurants: readonly RestaurantState[];
  restaurantId: string;
  setter: (id: string) => void;
  error?: { status: boolean; text?: string };
};

export const RestaurantDropdown: ParentComponent<Props> = (props) => {
  const merged = mergeProps({ error: { status: false, text: "" } }, props);

  const selectedRestaurant = () =>
    merged.activeRestaurants.find((r) => r.id === merged.restaurantId);

  return (
    <div class="field">
      <label class="label">Restaurant</label>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
        <Show
          when={merged.activeRestaurants.length > 0}
          fallback={
            <span class="is-italic">Noch kein Restaurant erfasst.</span>
          }
        >
          <Dropdown
            entries={merged.activeRestaurants.map((r) => ({
              label: r.label,
              value: r.id,
            }))}
            updateValue={merged.setter}
            hasErrors={merged.error.status}
          />
        </Show>
        {merged.children}
      </div>
      <Show when={selectedRestaurant()}>
        {(restaurant) => {
          const tags: Tag[] = [
            {
              label: restaurant.menuLink,
              link: restaurant.menuLink,
            },
          ];
          if (restaurant.comment.length) {
            tags.push({ label: restaurant.comment });
          }
          return (
            <div class="pt-3">
              <Tags tags={tags} />
            </div>
          );
        }}
      </Show>
      <Show when={merged.error.status}>
        <p class="help is-danger">{merged.error.text}</p>
      </Show>
      <p class="help">Wähle ein Restaurant aus oder füge ein neues hinzu.</p>
    </div>
  );
};

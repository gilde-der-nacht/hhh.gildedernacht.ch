import { Dropdown } from "@components/static/forms/Dropdown";
import { RestaurantState } from "@util/StateTypes";
import { Component, JSX, mergeProps, Show } from "solid-js";

type RestaurantDropdownProps = {
  activeRestaurants: readonly RestaurantState[];
  setter: (id: string) => void;
  error?: { status: boolean; text?: string };
  children: JSX.Element;
};

export const RestaurantDropdown: Component<RestaurantDropdownProps> = (
  props
) => {
  const merged = mergeProps({ error: { status: false, text: "" } }, props);

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
      <Show when={merged.error.status}>
        <p class="help is-danger">{merged.error.text}</p>
      </Show>
      <p class="help">Wähle ein Restaurant aus oder füge ein neues hinzu.</p>
    </div>
  );
};

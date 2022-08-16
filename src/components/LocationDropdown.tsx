import { Button } from "@components/static/Button";
import { Dropdown } from "@components/static/forms/Dropdown";
import { IconLeft } from "@components/static/icons/IconLeft";
import type { Component } from "solid-js";
import { Show } from "solid-js";
import type { Restaurant } from "StateType";

type LocationDropdownProps = {
  activeRestaurants: Restaurant[];
  newLocation: () => void;
};

export const LocationDropdown: Component<LocationDropdownProps> = (props) => {
  return (
    <div class="field">
      <label class="label">Restaurant</label>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
        <Show
          when={props.activeRestaurants.length > 0}
          fallback={
            <span class="is-italic">Noch kein Restaurant erfasst.</span>
          }
        >
          <Dropdown entries={props.activeRestaurants.map((r) => r.label)} />
        </Show>
        <Button color="success" outlined={true} onClick={props.newLocation}>
          <IconLeft icon="plus">Neues Restaurant</IconLeft>
        </Button>
      </div>
      <p class="help">Wähle ein Restaurant aus oder füge ein neues hinzu.</p>
    </div>
  );
};

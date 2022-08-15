import { Button } from "@components/static/Button";
import { Dropdown } from "@components/static/forms/Dropdown";
import { IconLeft } from "@components/static/icons/IconLeft";
import type { Component } from "solid-js";
import type { Restaurant } from "StateType";

type LocationDropdownProps = {
  newLocation: () => void;
  restaurants: Restaurant[];
};

export const LocationDropdown: Component<LocationDropdownProps> = (props) => {
  return (
    <div class="field">
      <label class="label">Restaurant</label>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
        <Dropdown entries={props.restaurants.map((r) => r.label)} />
        <Button color="success" outlined={true} onClick={props.newLocation}>
          <IconLeft icon="plus">Neues Restaurant</IconLeft>
        </Button>
      </div>
      <p class="help">Wähle ein Restaurant aus oder füge ein neues hinzu.</p>
    </div>
  );
};

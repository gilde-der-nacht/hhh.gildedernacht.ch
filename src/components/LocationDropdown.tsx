import { Button } from "@components/static/Button";
import { Dropdown } from "@components/static/forms/Dropdown";
import { IconLeft } from "@components/static/icons/IconLeft";
import type { Component } from "solid-js";
import { Restaurant } from "StateType";

type LocationDropdownProps = {
  newLocation: () => void;
  restaurants: Restaurant[];
};

export const LocationDropdown: Component<LocationDropdownProps> = ({
  newLocation,
  restaurants,
}) => {
  return (
    <div class="field">
      <label class="label">Restaurant</label>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
        <Dropdown entries={restaurants.map((r) => r.label)} />
        <Button color="success" outlined={true} onClick={newLocation}>
          <IconLeft icon="plus">Neues Restaurant</IconLeft>
        </Button>
      </div>
      <p class="help">Wähle ein Restaurant aus oder füge ein neues hinzu.</p>
    </div>
  );
};

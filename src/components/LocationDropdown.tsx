import type { Component } from "solid-js";
import { Button } from "@/static/Button";
import { Dropdown } from "@/static/forms/Dropdown";
import { IconLeft } from "@/static/icons/IconLeft";

type LocationDropdownProps = {
  newLocation: () => void;
};

export const LocationDropdown: Component<LocationDropdownProps> = ({
  newLocation,
}) => {
  return (
    <div class="field">
      <label class="label">Restaurant</label>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
        <Dropdown />
        <Button color="success" outlined={true} onClick={newLocation}>
          <IconLeft icon="plus">Neues Restaurant</IconLeft>
        </Button>
      </div>
      <p class="help">Wähle ein Restaurant aus oder füge ein neues hinzu.</p>
    </div>
  );
};

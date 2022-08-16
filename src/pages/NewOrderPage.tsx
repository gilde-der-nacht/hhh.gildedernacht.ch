import { LocationDropdown } from "@components/LocationDropdown";
import { Button } from "@components/static/Button";
import { Form } from "@components/static/forms/Form";
import { Input } from "@components/static/forms/Input";
import { NumberInput } from "@components/static/forms/NumberInput";
import { IconLeft } from "@components/static/icons/IconLeft";
import { Component } from "solid-js";
import { Restaurant } from "StateType";
import { PageType } from "./PageTypes";

type PageProps = {
  link: (page: PageType) => void;
  restaurants: Restaurant[];
};

export const NewOrderPage: Component<PageProps> = (props) => {
  const activeRestaurants = () => props.restaurants.filter((r) => r.active);

  return (
    <div class="hhh-spacer">
      <h3 class="title is-3 has-text-centered">Neue Bestellung</h3>
      <Form>
        <LocationDropdown
          newLocation={() => props.link("newLocation")}
          activeRestaurants={activeRestaurants()}
        />
        <Input
          label="Besteller"
          placeholder="Dein Name"
          helpText="Damit alle wissen, wer diese Bestellung abschickt."
        />
        <NumberInput
          label="Zeitfenster (in Minuten)"
          startValue={60}
          helptext="Wie lange haben die anderen Personen Zeit ihre Bestellung einzugeben."
        />
        <div
          class="pt-5 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
          style="gap: 1rem;"
        >
          <Button
            color="danger"
            outlined={true}
            size="large"
            onClick={() => props.link("start")}
          >
            <IconLeft icon="arrow-left">Zurück</IconLeft>
          </Button>
          <Button
            color="success"
            size="large"
            onClick={() => props.link("start")}
          >
            <IconLeft icon="check">Bestellung starten</IconLeft>
          </Button>
        </div>
      </Form>
    </div>
  );
};

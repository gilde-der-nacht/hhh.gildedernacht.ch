import { LocationDropdown } from "@/LocationDropdown";
import { Button } from "@/static/Button";
import { Form } from "@/static/forms/Form";
import { Input } from "@/static/forms/Input";
import { NumberInput } from "@/static/forms/NumberInput";
import { IconLeft } from "@/static/icons/IconLeft";
import type { Component } from "solid-js";
import type { PageType } from "./PageTypes";

type PageProps = { link: (page: PageType) => void };

export const NewOrderPage: Component<PageProps> = ({ link }) => {
  return (
    <div class="hhh-spacer">
      <h3 class="title is-3 has-text-centered">Neue Bestellung</h3>
      <Form>
        <Input
          label="Besteller"
          placeholder="Dein Name"
          helptext="Damit alle wissen, wer diese Bestellung abschickt."
        />
        <NumberInput
          label="Zeitfenster (in Minuten)"
          startValue={60}
          helptext="Wie lange haben die anderen Personen Zeit ihre Bestellung einzugeben."
        />
        <LocationDropdown newLocation={() => link("newLocation")} />
        <div
          class="pt-5 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
          style="gap: 1rem;"
        >
          <Button
            color="danger"
            outlined={true}
            size="large"
            onClick={() => link("start")}
          >
            <IconLeft icon="trash">Bestellung abbrechen</IconLeft>
          </Button>
          <Button color="success" size="large" onClick={() => link("start")}>
            <IconLeft icon="check">Bestellung aktivieren</IconLeft>
          </Button>
        </div>
      </Form>
    </div>
  );
};

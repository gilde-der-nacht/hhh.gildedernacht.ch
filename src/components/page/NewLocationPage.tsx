import { Button } from "@/static/Button";
import { Form } from "@/static/forms/Form";
import { Input } from "@/static/forms/Input";
import { IconLeft } from "@/static/icons/IconLeft";
import type { Component } from "solid-js";
import type { PageType } from "./PageTypes";

type PageProps = { link: (page: PageType) => void };

export const NewLocationPage: Component<PageProps> = ({ link }) => {
  return (
    <div class="hhh-spacer">
      <h3 class="title is-3 has-text-centered">Neues Restaurant</h3>
      <Form>
        <Input
          label="Restaurant"
          placeholder="Name des Restaurant"
          helptext="Der Name des Restaurants, der überall verwendet wird."
        />
        <Input
          label="Menülink"
          placeholder="https://..."
          helptext="Unter welchem Link das Menü des Restaurants eingesehen werden kann."
        />
        <div
          class="pt-5 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
          style="gap: 1rem;"
        >
          <Button
            color="danger"
            outlined={true}
            size="large"
            onClick={() => link("newOrder")}
          >
            <IconLeft icon="trash">Abbrechen</IconLeft>
          </Button>
          <Button color="success" size="large" onClick={() => link("newOrder")}>
            <IconLeft icon="check">Restaurant hinzufügen</IconLeft>
          </Button>
        </div>
      </Form>
    </div>
  );
};

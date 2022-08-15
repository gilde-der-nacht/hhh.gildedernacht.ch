import { Button } from "@/static/Button";
import { Form } from "@/static/forms/Form";
import { Input } from "@/static/forms/Input";
import { IconLeft } from "@/static/icons/IconLeft";
import { saveNewRestaurant } from "@util/api";
import { isEmpty } from "@util/utils";
import { Component, createSignal } from "solid-js";
import type { PageType } from "./PageTypes";

type PageProps = { link: (page: PageType) => void };

export const NewLocationPage: Component<PageProps> = ({ link }) => {
  const [restaurant, setRestaurant] = createSignal("");
  const [menulink, setMenulink] = createSignal("");
  const [activeValidation, setActiveValidation] = createSignal(false);
  return (
    <div class="hhh-spacer">
      <h3 class="title is-3 has-text-centered">Neues Restaurant</h3>
      <Form>
        <Input
          label="Restaurant"
          placeholder="Name des Restaurant"
          helpText="Der Name des Restaurants, der überall verwendet wird."
          error={{
            status: activeValidation() && isEmpty(restaurant()),
            text: "Pflichtfeld",
          }}
          setter={setRestaurant}
        />
        <Input
          label="Menülink"
          placeholder="https://..."
          helpText="Unter welchem Link das Menü des Restaurants eingesehen werden kann."
          error={{
            status: activeValidation() && isEmpty(menulink()),
            text: "Pflichtfeld",
          }}
          setter={setMenulink}
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
          <Button
            color="success"
            size="large"
            onClick={async (e) => {
              e.preventDefault();
              setActiveValidation(true);
              if (
                restaurant().trim().length !== 0 &&
                menulink().trim().length !== 0
              ) {
                try {
                  await saveNewRestaurant({
                    label: restaurant(),
                    menu: menulink(),
                    active: true,
                  });
                } finally {
                  link("newOrder");
                }
              }
            }}
          >
            <IconLeft icon="check">Restaurant hinzufügen</IconLeft>
          </Button>
        </div>
      </Form>
    </div>
  );
};

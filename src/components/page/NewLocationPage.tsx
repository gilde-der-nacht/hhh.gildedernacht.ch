import { Button } from "@/static/Button";
import { Card } from "@/static/Card";
import { Form } from "@/static/forms/Form";
import { Input } from "@/static/forms/Input";
import { IconLeft } from "@/static/icons/IconLeft";
import { saveNewRestaurant } from "@util/api";
import { isEmpty } from "@util/utils";
import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import type { Restaurant } from "StateType";
import type { PageType } from "./PageTypes";

type PageProps = {
  restaurants: Restaurant[];
  link: (page: PageType) => void;
};

export const NewLocationPage: Component<PageProps> = (props) => {
  const [restaurant, setRestaurant] = createSignal("");
  const [menulink, setMenulink] = createSignal("");
  const [activeValidation, setActiveValidation] = createSignal(false);
  return (
    <div class="hhh-spacer" style="--gap: 5rem;">
      <div>
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
              onClick={() => props.link("newOrder")}
            >
              <IconLeft icon="arrow-left">Zurück</IconLeft>
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
                  await saveNewRestaurant({
                    label: restaurant(),
                    menu: menulink(),
                    active: true,
                  });
                }
              }}
            >
              <IconLeft icon="check">Restaurant hinzufügen</IconLeft>
            </Button>
          </div>
        </Form>
      </div>
      <div>
        <h3 class="title is-3 has-text-centered">Restaurant Liste</h3>
        <div class="hhh-spacer" style="--gap: 1rem;">
          <For each={props.restaurants}>
            {(restaurant) => (
              <Card>
                <h5 class="m-0">{restaurant.label}</h5>
                <p class="is-italic">{restaurant.menu}</p>
              </Card>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

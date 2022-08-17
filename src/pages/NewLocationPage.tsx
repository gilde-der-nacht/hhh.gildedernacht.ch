import { Button } from "@components/static/Button";
import { Card } from "@components/static/Card";
import { Form } from "@components/static/forms/Form";
import { Input } from "@components/static/forms/Input";
import { Icon } from "@components/static/icons/Icon";
import { IconLeft } from "@components/static/icons/IconLeft";
import { deactivateRestaurant, saveNewRestaurant } from "@util/api";
import { isEmpty } from "@util/utils";
import { Component, createSignal, For } from "solid-js";
import { Restaurant } from "StateType";
import { PageType } from "@pages/Router";

type PageProps = {
  restaurants: Restaurant[];
  link: (page: PageType) => void;
};

export const NewLocationPage: Component<PageProps> = (props) => {
  const [restaurant, setRestaurant] = createSignal("");
  const [menulink, setMenulink] = createSignal("");
  const [activeValidation, setActiveValidation] = createSignal(false);

  const activeRestaurants = () => props.restaurants.filter((r) => r.active);

  const formSubmit = async (e: Event) => {
    e.preventDefault();
    setActiveValidation(true);
    if (restaurant().trim().length !== 0 && menulink().trim().length !== 0) {
      await saveNewRestaurant({
        label: restaurant(),
        menu: menulink(),
      });
    }
  };

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
              large={true}
              onClick={() => props.link("newOrder")}
            >
              <IconLeft icon="arrow-left">Zurück</IconLeft>
            </Button>
            <Button color="success" large={true} onClick={formSubmit}>
              <IconLeft icon="check">Restaurant hinzufügen</IconLeft>
            </Button>
          </div>
        </Form>
      </div>
      <div>
        <h3 class="title is-3 has-text-centered">Restaurant Liste</h3>
        <div class="hhh-spacer" style="--gap: 1rem;">
          <For each={activeRestaurants()}>
            {(restaurant) => (
              <Card isDisabled={!restaurant.active}>
                <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
                  <div>
                    <h5 class="m-0">{restaurant.label}</h5>
                    <p class="is-italic">
                      <a href={restaurant.menu}>{restaurant.menu}</a>
                    </p>
                  </div>
                  <Button
                    color="danger"
                    onClick={() => {
                      deactivateRestaurant(restaurant);
                    }}
                  >
                    <Icon icon="trash" />
                  </Button>
                </div>
              </Card>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

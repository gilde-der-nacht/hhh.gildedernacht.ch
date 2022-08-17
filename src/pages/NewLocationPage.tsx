import { Button } from "@components/static/Button";
import { Card } from "@components/static/Card";
import { Form } from "@components/static/forms/Form";
import { Input } from "@components/static/forms/Input";
import { Icon } from "@components/static/icons/Icon";
import { IconLeft } from "@components/static/icons/IconLeft";
import { PageProps } from "@pages/Router";
import { isEmpty, isValidUrl } from "@util/utils";
import { Component, createSignal, For, Show } from "solid-js";

export const NewLocationPage: Component<PageProps> = (props) => {
  const [restaurant, setRestaurant] = createSignal("");
  const [menulink, setMenulink] = createSignal("");
  const [comment, setComment] = createSignal("");
  const [activeValidation, setActiveValidation] = createSignal(false);

  const activeRestaurants = () =>
    props.state.restaurants.filter((r) => r.status === "active");
  const inactiveRestaurants = () =>
    props.state.restaurants.filter((r) => r.status === "inactive");

  const formSubmit = (e: Event) => {
    e.preventDefault();
    setActiveValidation(true);
    if (!isEmpty(restaurant()) && isValidUrl(menulink())) {
      props.API.saveNewRestaurant({
        label: restaurant(),
        menuLink: menulink(),
        comment: comment(),
      }).catch((e) => {
        console.error(e);
        props.setPage("networkError");
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
            isUrl={true}
            helpText="Unter welchem Link das Menü des Restaurants eingesehen werden kann."
            error={{
              status: activeValidation() && !isValidUrl(menulink()),
              text: "Pflichtfeld, muss mit 'https://' starten.",
            }}
            setter={setMenulink}
          />
          <Input
            label="Kommentar"
            placeholder="kann leer gelassen werden"
            required={false}
            setter={setComment}
          />
          <div
            class="pt-5 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
            style="gap: 1rem;"
          >
            <Button
              color="danger"
              outlined={true}
              large={true}
              onClick={() => props.setPage("newOrder")}
            >
              <IconLeft icon="arrow-left">Zurück</IconLeft>
            </Button>
            <Button
              color="success"
              large={true}
              onClick={formSubmit}
              isSubmit={true}
            >
              <IconLeft icon="check">Restaurant hinzufügen</IconLeft>
            </Button>
          </div>
        </Form>
      </div>
      <Show
        when={
          activeRestaurants().length > 0 || inactiveRestaurants().length > 0
        }
      >
        <div>
          <h3 class="title is-3 has-text-centered">Restaurant Liste</h3>
          <div class="hhh-spacer" style="--gap: 1rem;">
            <For each={activeRestaurants()}>
              {(restaurant) => (
                <Card isDisabled={false}>
                  <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
                    <div>
                      <h5 class="m-0">{restaurant.label}</h5>
                      <p class="is-italic">
                        <a href={restaurant.menuLink}>{restaurant.menuLink}</a>
                      </p>
                    </div>
                    <Button
                      color="danger"
                      onClick={() =>
                        props.API.deactivateRestaurant(restaurant).catch(
                          (e) => {
                            console.error(e);
                            props.setPage("networkError");
                          }
                        )
                      }
                    >
                      <Icon icon="trash" />
                    </Button>
                  </div>
                </Card>
              )}
            </For>
            <For each={inactiveRestaurants()}>
              {(restaurant) => (
                <Card isDisabled={true}>
                  <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
                    <div>
                      <h5 class="m-0">{restaurant.label}</h5>
                      <p class="is-italic">
                        <a href={restaurant.menuLink}>{restaurant.menuLink}</a>
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};

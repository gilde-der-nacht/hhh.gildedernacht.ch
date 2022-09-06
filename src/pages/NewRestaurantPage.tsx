import { RestaurantList } from "@components/restaurant/RestaurantList";
import { Button } from "@components/static/Button";
import { Form } from "@components/static/forms/Form";
import { Input } from "@components/static/forms/Input";
import { IconLeft } from "@components/static/icons/Icon";
import { PageProps } from "@pages/util/Router";
import { isEmpty, isValidUrl } from "@util/utils";
import { Component, createSignal } from "solid-js";

export const NewRestaurantPage: Component<PageProps> = (props) => {
  const [restaurant, setRestaurant] = createSignal("");
  const [menulink, setMenulink] = createSignal("");
  const [comment, setComment] = createSignal("");
  const [activeValidation, setActiveValidation] = createSignal(false);

  const formSubmit = (e: Event) => {
    e.preventDefault();
    setActiveValidation(true);
    if (!isEmpty(restaurant()) && isValidUrl(menulink())) {
      const promise = props.API.restaurant.create({
        label: restaurant(),
        menuLink: menulink(),
        comment: comment(),
      });
      promise.then(() => {
        setActiveValidation(false);
        setRestaurant("");
        setMenulink("");
        setComment("");
      });
    }
  };

  return (
    <div class="hhh-spacer" style="--gap: 5rem;">
      <div>
        <h3 class="title is-3 has-text-centered">
          <IconLeft icon="fork-knife">
            <span class="pl-2">Neues Restaurant</span>
          </IconLeft>
        </h3>
        <Form>
          <Input
            label="Restaurant"
            placeholder="Name des Restaurant"
            helpText="Der Name des Restaurants, der überall verwendet wird."
            error={{
              status: activeValidation() && isEmpty(restaurant()),
              text: "Pflichtfeld",
            }}
            value={restaurant()}
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
            value={menulink()}
            setter={setMenulink}
          />
          <Input
            label="Kommentar"
            placeholder="kann leer gelassen werden"
            isRequired={false}
            value={comment()}
            setter={setComment}
          />
          <div
            class="pt-5 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
            style="gap: 1rem;"
          >
            <Button
              color="success"
              isLarge={true}
              onClick={formSubmit}
              isSubmit={true}
            >
              <IconLeft icon="check">Restaurant hinzufügen</IconLeft>
            </Button>
          </div>
        </Form>
      </div>
      <RestaurantList
        activeRestaurants={props.state.restaurants.active}
        inactiveRestaurants={props.state.restaurants.inactive}
        deactivateRestaurant={props.API.restaurant.deactivate}
        reactivateRestaurant={props.API.restaurant.reactivate}
        removeRestaurant={props.API.restaurant.remove}
      />
    </div>
  );
};

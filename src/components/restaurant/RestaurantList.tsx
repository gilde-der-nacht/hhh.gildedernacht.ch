import { Button } from "@components/static/Button";
import { Card } from "@components/static/Card";
import { Icon } from "@components/static/icons/Icon";
import { Notification } from "@components/static/Notification";
import { RestaurantState } from "@util/StateTypes";
import { Component, createSignal, For, Show } from "solid-js";

type Props = {
  restaurants: readonly RestaurantState[];
  deactivateRestaurant: (restaurant: RestaurantState) => void;
  reactivateRestaurant: (restaurant: RestaurantState) => void;
  removeRestaurant: (restaurant: RestaurantState) => void;
};

export const RestaurantList: Component<Props> = (props) => {
  const [showList, setShowList] = createSignal(false);

  const activeRestaurants = () =>
    props.restaurants.filter((r) => r.status === "active");
  const inactiveRestaurants = () =>
    props.restaurants.filter((r) => r.status === "inactive");

  return (
    <Show
      when={showList()}
      fallback={
        <Button onClick={() => setShowList(true)}>
          Zeige Liste der Restaurants
        </Button>
      }
    >
      <div>
        <h3 class="title is-3 has-text-centered">Restaurant Liste</h3>
        <Show
          when={
            activeRestaurants().length === 0 &&
            inactiveRestaurants().length === 0
          }
        >
          <Notification kind="info">
            <em>Keine (aktiven oder inaktiven) Restaurants gefunden.</em>
          </Notification>
        </Show>
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
                    <Show when={restaurant.comment.trim().length > 0}>
                      <p class="is-italic">{restaurant.comment}</p>
                    </Show>
                  </div>
                  <Button
                    color="danger"
                    onClick={() => props.deactivateRestaurant(restaurant)}
                  >
                    <Icon icon="octagon-minus" />
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
                    <Show when={restaurant.comment.trim().length > 0}>
                      <p class="is-italic">{restaurant.comment}</p>
                    </Show>
                  </div>
                  <div class="buttons has-addons">
                    <Button
                      color="success"
                      onClick={() => props.reactivateRestaurant(restaurant)}
                    >
                      <Icon icon="octagon-plus" />
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => props.removeRestaurant(restaurant)}
                    >
                      <Icon icon="trash" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
};

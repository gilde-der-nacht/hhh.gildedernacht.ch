import { RestaurantListEntry } from "@components/restaurant/RestaurantListEntry";
import { Button } from "@components/static/Button";
import { Icon } from "@components/static/icons/Icon";
import { Notification } from "@components/static/Notification";
import { RestaurantState } from "@util/StateTypes";
import { Component, createSignal, For, Show } from "solid-js";

type Props = {
  activeRestaurants: readonly RestaurantState[];
  inactiveRestaurants: readonly RestaurantState[];
  deactivateRestaurant: (restaurant: RestaurantState) => void;
  reactivateRestaurant: (restaurant: RestaurantState) => void;
  removeRestaurant: (restaurant: RestaurantState) => void;
};

export const RestaurantList: Component<Props> = (props) => {
  const [showList, setShowList] = createSignal(false);

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
            props.activeRestaurants.length === 0 &&
            props.inactiveRestaurants.length === 0
          }
        >
          <Notification kind="info">
            <em>Keine (aktiven oder inaktiven) Restaurants gefunden.</em>
          </Notification>
        </Show>
        <div class="hhh-spacer" style="--gap: 1rem;">
          <For each={props.activeRestaurants}>
            {(restaurant) => (
              <RestaurantListEntry isDisabled={false} restaurant={restaurant}>
                <Button
                  color="danger"
                  onClick={() => props.deactivateRestaurant(restaurant)}
                >
                  <Icon icon="circle-stop" />
                </Button>
              </RestaurantListEntry>
            )}
          </For>
          <For each={props.inactiveRestaurants}>
            {(restaurant) => (
              <RestaurantListEntry isDisabled={true} restaurant={restaurant}>
                <div class="buttons has-addons">
                  <Button
                    color="success"
                    onClick={() => props.reactivateRestaurant(restaurant)}
                  >
                    <Icon icon="circle-play" />
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => props.removeRestaurant(restaurant)}
                  >
                    <Icon icon="trash" />
                  </Button>
                </div>
              </RestaurantListEntry>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
};

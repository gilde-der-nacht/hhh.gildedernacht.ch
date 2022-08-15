import { Grid } from "@components/layout/Grid";
import type { PageType } from "@pages/PageTypes";
import { getCountdown, getRestaurant } from "@util/utils";
import type { DateTime } from "luxon";
import type { Component } from "solid-js";
import { Show } from "solid-js";
import type { AppState, DisplayState } from "StateType";

type Props = {
  state: AppState;
  filter: DisplayState;
  setActiveOrder: (id: string) => void;
  link: (page: PageType) => void;
  now: DateTime;
};

export const OrderGrid: Component<Props> = ({
  state,
  filter,
  setActiveOrder,
  link,
  now,
}) => {
  return (
    <Grid
      each={state.orders.filter((o) => o.displayState === filter)}
      footer={(item) => [
        {
          label: "Bestellung anzeigen",
          onClick: () => {
            setActiveOrder(item.id);
            link("orderDetails");
          },
        },
      ]}
    >
      {(item) => {
        const restaurant = getRestaurant(item.restaurantId, state.restaurants);
        return (
          <div class="content">
            <h4 class="title is-4 m-0">{restaurant.label}</h4>
            <p>{item.name}</p>
            <Show
              when={getCountdown(item.timestamp, item.timeWindow, now) !== null}
            >
              <strong class="has-text-danger">
                Noch {getCountdown(item.timestamp, item.timeWindow, now)}
              </strong>
            </Show>
          </div>
        );
      }}
    </Grid>
  );
};

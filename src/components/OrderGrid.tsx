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

export const OrderGrid: Component<Props> = (props) => {
  return (
    <Grid
      each={props.state.orders.filter((o) => o.displayState === props.filter)}
      footer={(item) => [
        {
          label: "Bestellung anzeigen",
          onClick: () => {
            props.setActiveOrder(item.id);
            props.link("orderDetails");
          },
        },
      ]}
    >
      {(item) => {
        const restaurant = getRestaurant(
          item.restaurantId,
          props.state.restaurants
        );
        return (
          <div class="content">
            <h4 class="title is-4 m-0">{restaurant?.label}</h4>
            <p>{item.name}</p>
            <Show
              when={
                getCountdown(item.timestamp, item.timeWindow, props.now) !==
                null
              }
            >
              <strong class="has-text-danger">
                Noch {getCountdown(item.timestamp, item.timeWindow, props.now)}
              </strong>
            </Show>
          </div>
        );
      }}
    </Grid>
  );
};

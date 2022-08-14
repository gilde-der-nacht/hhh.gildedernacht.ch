import { Grid } from "@/layout/Grid";
import { getRestaurant } from "@util/utils";
import type { Component } from "solid-js";
import type { AppState, DisplayState } from "StateType";
import type { PageType } from "./page/PageTypes";

type Props = {
  state: AppState;
  filter: DisplayState;
  setActiveOrder: (id: string) => void;
  link: (page: PageType) => void;
};

export const OrderGrid: Component<Props> = ({
  state,
  filter,
  setActiveOrder,
  link,
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
          <>
            <h4 class="title is-4">{restaurant.label}</h4>
            <p>{item.name}</p>
            <p>{item.timestamp.toISOTime()}</p>
          </>
        );
      }}
    </Grid>
  );
};

import { Button } from "@/static/Button";
import { IconLeft } from "@/static/icons/IconLeft";
import { getRestaurant } from "@util/utils";
import type { Component, JSX } from "solid-js";
import type { AppState, Order } from "StateType";
import type { PageType } from "./PageTypes";

type PageProps = {
  state: AppState;
  activeOrder: Order | null;
  fallback: JSX.Element;
  link: (page: PageType) => void;
};

export const OrderDetailsPage: Component<PageProps> = ({
  state,
  activeOrder,
  fallback,
  link,
}) => {
  if (activeOrder === null) {
    return fallback;
  }
  return (
    <div class="hhh-spacer">
      <div>
        <h3 class="title is-3 has-text-centered">
          {getRestaurant(activeOrder.restaurantId, state.restaurants)?.label}
        </h3>
        <h4 class="subtitle is-4 has-text-centered">{activeOrder.name}</h4>
      </div>
      <div
        class="pt-5 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
        style="gap: 1rem;"
      >
        <Button
          color="danger"
          outlined={true}
          size="large"
          onClick={() => link("start")}
        >
          <IconLeft icon="arrow-left">Zurück</IconLeft>
        </Button>
      </div>
    </div>
  );
};

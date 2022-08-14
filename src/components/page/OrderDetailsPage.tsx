import { AddEntry } from "@/AddEntry";
import { Button } from "@/static/Button";
import { IconLeft } from "@/static/icons/IconLeft";
import { getRestaurant } from "@util/utils";
import { Component, For, JSX, Show } from "solid-js";
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
  const entries = state.entries.filter((e) => e.orderId === activeOrder.id);
  return (
    <div class="hhh-spacer" style="--gap: 5rem;">
      <div>
        <h3 class="title is-3 has-text-centered">
          {getRestaurant(activeOrder.restaurantId, state.restaurants)?.label}
        </h3>
        <h4 class="subtitle is-4 has-text-centered">{activeOrder.name}</h4>
      </div>
      <div>
        <h4 class="title is-4 has-text-centered">
          Einträge ({entries.length})
        </h4>
        <div class="hhh-spacer" style="--gap: 1rem;">
          <For each={entries}>
            {(entry) => (
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <h5 class="m-0">{entry.menuItem}</h5>
                    <p>{entry.name}</p>
                    <p class="is-italic">{entry.comment}</p>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
      <Show when={activeOrder.displayState === "open"}>
        <AddEntry />
      </Show>
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

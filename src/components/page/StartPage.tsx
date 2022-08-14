import { OrderGrid } from "@/OrderGrid";
import { Button } from "@/static/Button";
import { IconLeft } from "@/static/icons/IconLeft";
import { Component } from "solid-js";
import type { AppState } from "StateType";
import type { PageType } from "./PageTypes";

type PageProps = {
  state: AppState;
  setActiveOrder: (id: string) => void;
  link: (page: PageType) => void;
};

export const StartPage: Component<PageProps> = ({
  state,
  link,
  setActiveOrder,
}) => {
  return (
    <div class="hhh-spacer" style="--gap: 5rem;">
      <div>
        <h3 class="title is-3 has-text-centered">Aktive Bestellungen</h3>
        <OrderGrid
          state={state}
          filter="open"
          link={link}
          setActiveOrder={setActiveOrder}
        />
      </div>
      <div>
        <h3 class="title is-3 has-text-centered">
          Starte eine neue Bestellung
        </h3>
        <div class="has-text-centered">
          <Button
            color="success"
            size="large"
            onClick={() => link("newOrder")}
          >
            <IconLeft icon="plus">Neue Bestellung</IconLeft>
          </Button>
        </div>
      </div>
      <div>
        <h3 class="title is-3 has-text-centered">
          Abgeschlossene Bestellungen
        </h3>
        <OrderGrid
          state={state}
          filter="closed"
          link={link}
          setActiveOrder={setActiveOrder}
        />
      </div>
    </div>
  );
};

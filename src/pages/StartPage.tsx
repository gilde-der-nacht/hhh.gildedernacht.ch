import { OrderGrid } from "@components/order/OrderGrid";
import { PageProps } from "@pages/Router";
import { Component } from "solid-js";

export const StartPage: Component<PageProps> = (props) => {
  
  return (
    <div class="hhh-spacer" style="--gap: 5rem;">
      <div>
        <h3 class="title is-3 has-text-centered">Aktive Bestellungen</h3>
        <OrderGrid state={props.state} filter="active" />
      </div>
      <div>
        <div class="mb-5">
          <h3 class="title is-3 has-text-centered m-0">
            Abgeschlossene Bestellungen
          </h3>
          <p class="has-text-centered is-italic">
            die Bestellungen der letzten 24 Stunden
          </p>
        </div>
        <OrderGrid state={props.state} filter="inactive" />
      </div>
    </div>
  );
};

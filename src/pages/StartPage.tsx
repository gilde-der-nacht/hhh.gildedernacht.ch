import { OrderGrid } from "@components/order/OrderGrid";
import { Button } from "@components/static/Button";
import { IconLeft } from "@components/static/icons/Icon";
import { Notification } from "@components/static/Notification";
import { PageProps } from "@pages/util/Router";
import { Component, createSignal, Show } from "solid-js";

export const StartPage: Component<PageProps> = (props) => {
  const [showDeactivated, setShowDeactivated] = createSignal(false);

  return (
    <div class="hhh-spacer" style="--gap: 3rem;">
      <div>
        <h3 class="title is-3 has-text-centered">
          <IconLeft icon="bars-staggered">
            <span class="pl-2">Aktive Bestellungen</span>
          </IconLeft>
        </h3>
        <Show
          when={
            props.state.orders.filter((o) => o.status === "active").length > 0
          }
          fallback={
            <Notification kind="info">
              <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-center">
                <p>
                  <em>Keine aktiven Bestellungen gefungen.</em>
                </p>
                <Button
                  large={true}
                  onClick={() => props.setPage("newOrder")}
                  color="success"
                >
                  <IconLeft icon="receipt"> Neue Bestellung</IconLeft>
                </Button>
              </div>
            </Notification>
          }
        >
          <OrderGrid
            state={props.state}
            filter="active"
            deactivateOrder={props.API.order.deactivate}
            reactivateOrder={props.API.order.reactivate}
            removeOrder={props.API.order.remove}
          />
        </Show>
      </div>
      <hr />
      <Show
        when={showDeactivated()}
        fallback={
          <Button onClick={() => setShowDeactivated(true)}>
            Zeige abgeschlossene Bestellungen
          </Button>
        }
      >
        <div>
          <div class="mb-5">
            <h3 class="title is-3 has-text-centered m-0">
              Abgeschlossene Bestellungen
            </h3>
            <p class="has-text-centered is-italic">
              die Bestellungen der letzten 24 Stunden
            </p>
          </div>
          <Show
            when={
              props.state.orders.filter((o) => o.status === "inactive").length >
              0
            }
            fallback={
              <Notification kind="info">
                <em>
                  Keine abgeschlossenen Bestellungen der letzten 24 Stunden
                  gefunden.
                </em>
              </Notification>
            }
          >
            <OrderGrid
              state={props.state}
              filter="inactive"
              deactivateOrder={props.API.order.deactivate}
              reactivateOrder={props.API.order.reactivate}
              removeOrder={props.API.order.remove}
            />
          </Show>
        </div>
      </Show>
    </div>
  );
};

import { CUT_OFF_TIME_HOURS } from "@api/aggregate";
import { OrderGrid } from "@components/order/OrderGrid";
import { Button } from "@components/static/Button";
import { IconLeft } from "@components/static/icons/Icon";
import { Notification } from "@components/static/Notification";
import { PageType } from "@pages/util/Router";
import { AppData, OrderState } from "@util/StateTypes";
import { Component, createSignal, Show } from "solid-js";

type Props = {
  data: AppData;
  setPage: (page: PageType) => void;
  openOrder: (order: OrderState) => void;
  deactivateOrder: (order: OrderState) => void;
  reactivateOrder: (order: OrderState) => void;
  removeOrder: (order: OrderState) => void;
};

export const OrderOverview: Component<Props> = (props) => {
  const [showDeactivated, setShowDeactivated] = createSignal(false);

  return (
    <>
      <div>
        <h3 class="title is-3 has-text-centered">
          <IconLeft icon="bars-staggered">
            <span class="pl-2">Aktive Bestellungen</span>
          </IconLeft>
        </h3>
        <Show
          when={props.data.orders.active.length > 0}
          fallback={
            <Notification kind="info">
              <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-center">
                <p>
                  <em>Keine aktiven Bestellungen gefungen.</em>
                </p>
                <Button
                  isLarge={true}
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
            orders={props.data.orders.active}
            activeRestaurants={props.data.restaurants.active}
            openOrder={props.openOrder}
            deactivateOrder={props.deactivateOrder}
            reactivateOrder={props.reactivateOrder}
            removeOrder={props.removeOrder}
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
              die Bestellungen der letzten {CUT_OFF_TIME_HOURS} Stunden
            </p>
          </div>
          <Show
            when={props.data.orders.inactive.length > 0}
            fallback={
              <Notification kind="info">
                <em>
                  Keine abgeschlossenen Bestellungen der letzten{" "}
                  {CUT_OFF_TIME_HOURS} Stunden gefunden.
                </em>
              </Notification>
            }
          >
            <OrderGrid
              orders={props.data.orders.inactive}
              activeRestaurants={props.data.restaurants.active}
              openOrder={props.openOrder}
              deactivateOrder={props.deactivateOrder}
              reactivateOrder={props.reactivateOrder}
              removeOrder={props.removeOrder}
              isDisabled={true}
            />
          </Show>
        </div>
      </Show>
    </>
  );
};

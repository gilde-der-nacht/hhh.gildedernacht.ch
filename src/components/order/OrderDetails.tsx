import { Button } from "@components/static/Button";
import { Card } from "@components/static/Card";
import { Icon, IconLeft } from "@components/static/icons/Icon";
import { AppState, OrderState } from "@util/StateTypes";
import { Component, Show } from "solid-js";

type Props = { order: OrderState; state: AppState; goBack: () => void };

export const OrderDetails: Component<Props> = (props) => {
  const restaurant = () => {
    const restaurant = props.state.restaurants.active.find(
      (r) => r.id === props.order.restaurantId
    );
    if (typeof restaurant === "undefined") {
      throw new Error("This should not be able to happen!");
    }
    return restaurant;
  };

  return (
    <>
      <div>
        <h3 class="title is-3 has-text-centered">
          <div class="is-pulled-right">
            <Button onClick={props.goBack}>
              <Icon icon="xmark-large" />
            </Button>
          </div>
          <IconLeft icon="table-list">
            <span class="pl-2">{restaurant().label}</span>
          </IconLeft>
        </h3>
      </div>
      <div class="tags is-justify-content-center">
        <span
          class="tag"
          classList={{
            "is-success": props.order.status === "active",
            "is-danger": props.order.status === "inactive",
          }}
        >
          {props.order.status === "active" ? "Aktiv" : "Inaktiv"}
        </span>
      </div>
      <Card>
        <p>
          <strong>Besteller</strong> <em>{props.order.orderer}</em>
          <Show when={restaurant().comment}>
            {" "}
            || <strong>Hinweis Restaurant</strong>{" "}
            <em>{restaurant().comment}</em>
          </Show>
          <Show when={props.order.comment}>
            {" "}
            || <strong>Hinweis Bestellung</strong>{" "}
            <em>{props.order.comment}</em>
          </Show>
        </p>
      </Card>
    </>
  );
};

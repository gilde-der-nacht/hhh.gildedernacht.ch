import { Icon } from "@components/static/icons/Icon";
import { Grid, GridElementFooter } from "@layout/Grid";
import { AppState, DerivedOrderStatus, OrderState } from "@util/StateTypes";
import { Component } from "solid-js";

type Props = {
  state: AppState;
  filter: DerivedOrderStatus;
};

export const OrderGrid: Component<Props> = (props) => {
  const restaurantIds = () => props.state.restaurants.map((r) => r.id);
  const orders = () =>
    props.state.orders
      .filter((o) => o.status === props.filter)
      .filter((o) => restaurantIds().includes(o.restaurantId));

  const footer = (item: OrderState): GridElementFooter[] => {
    const footerElements: GridElementFooter[] = [
      {
        label: <>Bestellung anzeigen</>,
        onClick: () => {
          console.log("tobedone");
        },
      },
    ];

    if (item.status === "active") {
      footerElements.push({
        label: <Icon icon="octagon-minus"></Icon>,
        onClick: () => {},
        kind: "danger",
      });
    } else {
      footerElements.push({
        label: <Icon icon="octagon-plus"></Icon>,
        onClick: () => {},
        kind: "success",
      });
      footerElements.push({
        label: <Icon icon="trash"></Icon>,
        onClick: () => {},
        kind: "danger",
      });
    }
    return footerElements;
  };

  return (
    <Grid each={orders()} footer={footer}>
      {(item) => {
        const restaurant = props.state.restaurants.find(
          (r) => r.id === item.restaurantId
        );
        if (typeof restaurant === "undefined") {
          throw new Error("This should not be able to happen!");
        }
        return (
          <div class="content">
            <h4 class="title is-4 m-0">{restaurant.label}</h4>
            <p>{item.orderer}</p>
            <p>
              <em>{item.comment}</em>
            </p>
            {/* <Show
              when={
                getCountdown(item.timestamp, item.timeWindow, props.now) !==
                null
              }
            >
              <strong class="has-text-danger">
                Noch {getCountdown(item.timestamp, item.timeWindow, props.now)}
              </strong>
            </Show> */}
          </div>
        );
      }}
    </Grid>
  );
};

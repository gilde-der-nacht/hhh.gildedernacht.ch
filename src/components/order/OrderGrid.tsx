import { Icon } from "@components/static/icons/Icon";
import { Grid, GridElementFooter } from "@layout/Grid";
import { OrderState, RestaurantState } from "@util/StateTypes";
import { Component } from "solid-js";

type Props = {
  orders: readonly OrderState[];
  activeRestaurants: readonly RestaurantState[];
  showOrder: (order: OrderState) => void;
  deactivateOrder: (order: OrderState) => void;
  reactivateOrder: (order: OrderState) => void;
  removeOrder: (order: OrderState) => void;
};

export const OrderGrid: Component<Props> = (props) => {
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
        label: <Icon icon="circle-stop"></Icon>,
        onClick: () => props.deactivateOrder(item),
        kind: "danger",
      });
    } else {
      footerElements.push({
        label: <Icon icon="circle-play"></Icon>,
        onClick: () => props.reactivateOrder(item),
        kind: "success",
      });
      footerElements.push({
        label: <Icon icon="trash"></Icon>,
        onClick: () => props.removeOrder(item),
        kind: "danger",
      });
    }
    return footerElements;
  };

  return (
    <Grid each={props.orders} footer={footer}>
      {(item) => {
        const restaurant = props.activeRestaurants.find(
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
          </div>
        );
      }}
    </Grid>
  );
};

import { Icon } from "@components/static/icons/Icon";
import { Tag } from "@components/static/Tags";
import { Grid, GridElementFooter } from "@layout/Grid";
import { OrderState, RestaurantState } from "@util/StateTypes";
import { formatDate, hasBeenUpdated } from "@util/utils";
import { Component, mergeProps } from "solid-js";

type Props = {
  orders: readonly OrderState[];
  activeRestaurants: readonly RestaurantState[];
  openOrder: (order: OrderState) => void;
  deactivateOrder: (order: OrderState) => void;
  reactivateOrder: (order: OrderState) => void;
  removeOrder: (order: OrderState) => void;
  isDisabled?: boolean;
  showStatusTag?: boolean;
};

export const OrderGrid: Component<Props> = (props) => {
  const merged = mergeProps({ isDisabled: false, showStatusTag: true }, props);

  const footer = (item: OrderState): GridElementFooter[] => {
    const footerElements: GridElementFooter[] = [
      {
        label: <>Bestellung anzeigen</>,
        onClick: () => merged.openOrder(item),
      },
    ];

    if (item.status === "active") {
      footerElements.push({
        label: <Icon icon="circle-stop"></Icon>,
        onClick: () => merged.deactivateOrder(item),
        kind: "danger",
      });
    } else {
      footerElements.push({
        label: <Icon icon="circle-play"></Icon>,
        onClick: () => merged.reactivateOrder(item),
        kind: "success",
      });
      footerElements.push({
        label: <Icon icon="trash"></Icon>,
        onClick: () => merged.removeOrder(item),
        kind: "danger",
      });
    }
    return footerElements;
  };

  const tags = (item: OrderState): Tag[] => {
    const tags: Tag[] = [{ label: `Erstellt: ${formatDate(item.created)}` }];
    if (hasBeenUpdated(item)) {
      tags.push({ label: `Bearbeitet: ${formatDate(item.updated)}` });
    }
    tags.push({
      label: `Deadline: ${formatDate(
        item.created.plus({ minutes: item.timeWindow })
      )}`,
    });
    return tags;
  };

  return (
    <Grid
      each={merged.orders}
      footer={footer}
      tags={tags}
      isDisabled={merged.isDisabled}
      showStatusTag={merged.showStatusTag}
    >
      {(item) => {
        const restaurant = merged.activeRestaurants.find(
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

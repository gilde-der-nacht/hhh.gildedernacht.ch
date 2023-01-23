import { Icon } from "@components/static/icons/Icon";
import { Tag } from "@components/static/Tags";
import { Grid, GridElementFooter } from "@layout/Grid";
import { EntryState, OrderState, RestaurantState } from "@util/StateTypes";
import { formatDate, formatDateForHumans, hasBeenUpdated } from "@util/utils";
import { Component, mergeProps, Show } from "solid-js";

type Props = {
  orders: readonly OrderState[];
  activeEntries: readonly EntryState[];
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
        title: "Bestellung stoppen",
        label: <Icon icon="circle-stop"></Icon>,
        onClick: () => merged.deactivateOrder(item),
        kind: "danger",
      });
    } else {
      footerElements.push({
        title: "Bestellung fortsetzen",
        label: <Icon icon="circle-play"></Icon>,
        onClick: () => merged.reactivateOrder(item),
        kind: "success",
      });
      footerElements.push({
        title: "Bestellung löschen",
        label: <Icon icon="trash"></Icon>,
        onClick: () => merged.removeOrder(item),
        kind: "danger",
      });
    }
    return footerElements;
  };

  const tags = (item: OrderState) => {
    const list: Tag[] = [];
    if (!hasBeenUpdated(item) && !merged.isDisabled) {
      list.push({
        label: `Deadline: ${formatDateForHumans(
          item.created.plus({ minutes: item.timeWindow })
        )}`,
        title: formatDate(item.created.plus({ minutes: item.timeWindow })),
      });
    }
    return list;
  };

  return (
    <Grid
      each={merged.orders}
      footer={footer}
      isDisabled={merged.isDisabled}
      showStatusTag={merged.showStatusTag}
      tags={tags}
    >
      {(item) => {
        const restaurant = merged.activeRestaurants.find(
          (r) => r.id === item.restaurantId
        );
        const entries = merged.activeEntries.filter(
          (e) => e.orderId === item.id
        );
        if (typeof restaurant === "undefined") {
          throw new Error("This should not be able to happen!");
        }
        return (
          <div class="content">
            <h4 class="title is-4 m-0">
              {restaurant.label}{" "}
              <span class="pl-2 has-text-info">({entries.length})</span>
            </h4>
            <p>{item.orderer}</p>
            <Show when={item.comment.length > 0}>
              <p>
                <em>{item.comment}</em>
              </p>
            </Show>
          </div>
        );
      }}
    </Grid>
  );
};

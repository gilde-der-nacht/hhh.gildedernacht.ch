import { EntryUpdatePost } from "@api/ApiTypes";
import { EntryList } from "@components/entry/EntryList";
import { NewEntryForm } from "@components/entry/NewEntryForm";
import { Button } from "@components/static/Button";
import { Icon, IconLeft } from "@components/static/icons/Icon";
import { Notification } from "@components/static/Notification";
import { Tag, Tags } from "@components/static/Tags";
import { AppData, OrderState } from "@util/StateTypes";
import { formatDate, hasBeenUpdated } from "@util/utils";
import { Component, Show } from "solid-js";

type Props = {
  order: OrderState;
  data: AppData;
  goBack: () => void;
  createEntry: (
    entry: Omit<
      EntryUpdatePost,
      "status" | "id" | "kind" | "created" | "updated"
    >
  ) => Promise<Response>;
};

export const OrderDetails: Component<Props> = (props) => {
  const restaurant = () => {
    const restaurant = props.data.restaurants.active.find(
      (r) => r.id === props.order.restaurantId
    );
    if (typeof restaurant === "undefined") {
      throw new Error("This should not be able to happen!");
    }
    return restaurant;
  };

  const entries = {
    active: () =>
      props.data.entries.active.filter((e) => e.orderId === props.order.id),
    inactive: () =>
      props.data.entries.inactive.filter((e) => e.orderId === props.order.id),
  };

  const tags: Tag[] = [
    {
      label: props.order.status === "active" ? "aktiv" : "inaktiv",
      kind: props.order.status === "active" ? "success" : "danger",
    },
    { label: `Erstellt: ${formatDate(props.order.created)}` },
  ];
  if (hasBeenUpdated(props.order)) {
    tags.push({ label: `Bearbeitet: ${formatDate(props.order.updated)}` });
  }
  tags.push({
    label: `Deadline: ${formatDate(
      props.order.created.plus({ minutes: props.order.timeWindow })
    )}`,
  });

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
        <Tags isJustified tags={tags} />
        <Notification kind="info">
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
            </Show>{" "}
            ||{" "}
            <strong>
              {entries.active().length}{" "}
              {entries.active().length === 1 ? "Eintrag" : "Einträge"}
            </strong>
          </p>
        </Notification>
      </div>
      <Show when={props.order.status === "active"}>
        <NewEntryForm
          orderId={props.order.id}
          createEntry={props.createEntry}
        />
      </Show>
      <EntryList
        activeEntries={entries.active()}
        inactiveEntries={entries.inactive()}
      />
    </>
  );
};

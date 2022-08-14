import { Button } from "@/static/Button";
import { IconLeft } from "@/static/icons/IconLeft";
import type { Component, JSX } from "solid-js";
import type { Order } from "StateType";
import type { PageType } from "./PageTypes";

type PageProps = {
  activeOrder: Order | null;
  fallback: JSX.Element;
  link: (page: PageType) => void;
};

export const OrderDetailsPage: Component<PageProps> = ({
  activeOrder,
  fallback,
  link,
}) => {
  if (activeOrder === null) {
    return fallback;
  }
  return (
    <div class="hhh-spacer">
      {JSON.stringify(activeOrder, null, 2)}{" "}
      <div
        class="pt-5 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
        style="gap: 1rem;"
      >
        <Button
          color="danger"
          outlined={true}
          size="large"
          onClick={() => link("start")}
        >
          <IconLeft icon="arrow-left">Zurück</IconLeft>
        </Button>
      </div>
    </div>
  );
};

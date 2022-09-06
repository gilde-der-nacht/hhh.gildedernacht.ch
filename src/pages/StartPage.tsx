import { OrderDetails } from "@components/order/OrderDetails";
import { OrderOverview } from "@components/order/OrderOverview";
import { PageProps } from "@pages/util/Router";
import { Component, Show } from "solid-js";

export const StartPage: Component<PageProps> = (props) => {
  const Overview = () => (
    <OrderOverview
      state={props.state}
      setPage={props.setPage}
      openOrder={props.setActiveOrder}
      deactivateOrder={props.API.order.deactivate}
      reactivateOrder={props.API.order.reactivate}
      removeOrder={props.API.order.remove}
    />
  );

  return (
    <div class="hhh-spacer" style="--gap: 3rem;">
      <Show when={props.activeOrder()} fallback={Overview}>
        {(order) => (
          <OrderDetails
            order={order}
            state={props.state}
            goBack={() => props.setActiveOrder(null)}
            createEntry={props.API.entry.create}
          />
        )}
      </Show>
    </div>
  );
};

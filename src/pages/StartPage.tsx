import { OrderDetails } from "@components/order/OrderDetails";
import { OrderOverview } from "@components/order/OrderOverview";
import { PageProps } from "@pages/util/Router";
import { OrderState } from "@util/StateTypes";
import { Component, createSignal, Show } from "solid-js";

export const StartPage: Component<PageProps> = (props) => {
  const [activeOrder, setActiveOrder] = createSignal<null | OrderState>(null);

  const Overview = () => (
    <OrderOverview
      state={props.state}
      setPage={props.setPage}
      openOrder={setActiveOrder}
      deactivateOrder={props.API.order.deactivate}
      reactivateOrder={props.API.order.reactivate}
      removeOrder={props.API.order.remove}
    />
  );

  return (
    <div class="hhh-spacer" style="--gap: 3rem;">
      <Show when={activeOrder()} fallback={Overview}>
        {(order) => <OrderDetails order={order} />}
      </Show>
    </div>
  );
};

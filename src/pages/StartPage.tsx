import { OrderDetails } from "@components/order/OrderDetails";
import { OrderOverview } from "@components/order/OrderOverview";
import { PageProps } from "@pages/util/Router";
import { link, setActiveOrder } from "@util/utils";
import { Component, Show } from "solid-js";

export const StartPage: Component<PageProps> = (props) => {
  const [state, setState] = props.stateSignal;

  const Overview = () => (
    <OrderOverview
      data={props.data}
      stateSignal={props.stateSignal}
      setPage={link(setState)}
      openOrder={setActiveOrder(setState)}
      deactivateOrder={props.API.order.deactivate}
      reactivateOrder={props.API.order.reactivate}
      removeOrder={props.API.order.remove}
    />
  );

  return (
    <div class="hhh-spacer" style="--gap: 3rem;">
      <Show when={state().activeOrder} fallback={Overview}>
        {(order) => (
          <OrderDetails
            order={order}
            data={props.data}
            goBack={() => setActiveOrder(setState)(null)}
            createEntry={props.API.entry.create}
            deactivateEntry={props.API.entry.deactivate}
            reactivateEntry={props.API.entry.reactivate}
            removeEntry={props.API.entry.remove}
          />
        )}
      </Show>
    </div>
  );
};

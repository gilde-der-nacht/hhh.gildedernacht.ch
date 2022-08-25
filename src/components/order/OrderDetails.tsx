import { OrderState } from "@util/StateTypes";
import { Component } from "solid-js";

type Props = { order: OrderState };

export const OrderDetails: Component<Props> = (props) => {
  return <h1>{props.order.orderer}</h1>;
};

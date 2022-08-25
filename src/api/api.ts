import { aggragateData } from "@api/aggregate";
import { EntryAPI } from "@api/entry-api";
import OLYMP from "@api/olymp";
import { OrderAPI } from "@api/order-api";
import { RestaurantAPI } from "@api/restaurant-api";
import { ToastOptions } from "@components/static/Toast";
import { AppState } from "@util/StateTypes";
import { DateTime } from "luxon";
import { Setter } from "solid-js";

export type ApiProps = {
  refetch: Refetcher;
  setToast: Setter<ToastOptions>;
};

export type Refetcher = (
  info?: unknown
) => AppState | Promise<AppState | undefined> | null | undefined;

export const loadServerResource = async (now: DateTime): Promise<AppState> => {
  const data = await OLYMP.GET();
  return aggragateData(data, now);
};

export default (props: ApiProps) => ({
  restaurant: RestaurantAPI(props),
  order: OrderAPI(props),
  entry: EntryAPI(props),
});

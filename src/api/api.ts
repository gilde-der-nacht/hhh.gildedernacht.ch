import { aggragateData } from "@api/aggregate";
import { EntryAPI } from "@api/entry-api";
import OLYMP from "@api/olymp";
import { OrderAPI } from "@api/order-api";
import { RestaurantAPI } from "@api/restaurant-api";
import { AppState } from "@util/StateTypes";
import { DateTime } from "luxon";

export type Refetcher = (
  info?: unknown
) => AppState | Promise<AppState | undefined> | null | undefined;

export const loadServerResource = async (now: DateTime): Promise<AppState> => {
  const data = await OLYMP.GET();
  return aggragateData(data, now);
};

export default (refetcher: Refetcher) => ({
  restaurant: RestaurantAPI(refetcher),
  order: OrderAPI(refetcher),
  entry: EntryAPI(refetcher),
});

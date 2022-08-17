import { JSX } from "solid-js";
import { AppState } from "StateType";

export type PageType = "start" | "newOrder" | "newLocation" | "orderDetails";

export const Router:
  | {
      [_ in PageType]: (
        state: AppState,
        link: (page: PageType) => void
      ) => () => JSX.Element;
    }
  | {} = {};

import API from "@api/api";
import { ToastOptions } from "@components/Toast";
import { NewRestaurantPage } from "@pages/NewRestaurantPage";
import { NewOrderPage } from "@pages/NewOrderPage";
import { StartPage } from "@pages/StartPage";
import { AppState } from "@util/StateTypes";
import { JSX } from "solid-js";

export type PageType = "start" | "newOrder" | "newRestaurant";

export type PageProps = {
  state: AppState;
  setPage: (page: PageType) => void;
  setToast: (options: ToastOptions) => void;
  API: typeof API;
};

export const Router: {
  [_ in PageType]: (props: PageProps) => () => JSX.Element;
} = {
  start: (props) => () => <StartPage {...props} />,
  newOrder: (props) => () => <NewOrderPage {...props} />,
  newRestaurant: (props) => () => <NewRestaurantPage {...props} />,
};

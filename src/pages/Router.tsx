import API from "@api/api";
import { ToastOptions } from "@components/Toast";
import { NewLocationPage } from "@pages/NewLocationPage";
import { NewOrderPage } from "@pages/NewOrderPage";
import { StartPage } from "@pages/StartPage";
import { AppState } from "@util/StateTypes";
import { JSX } from "solid-js";

export type PageType = "start" | "newOrder" | "newLocation";

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
  newLocation: (props) => () => <NewLocationPage {...props} />,
};

import API from "@api/api";
import { ToastOptions } from "@components/static/Toast";
import { NewOrderPage } from "@pages/NewOrderPage";
import { NewRestaurantPage } from "@pages/NewRestaurantPage";
import { StartPage } from "@pages/StartPage";
import { AppData, OrderState } from "@util/StateTypes";
import { Accessor, JSX } from "solid-js";

export type PageType = "start" | "newOrder" | "newRestaurant";

export type PageProps = {
  data: AppData;
  activeOrder: OrderState | null;
  setActiveOrder: (order: OrderState | null) => void;
  setPage: (page: PageType) => void;
  setToast: (options: ToastOptions) => void;
  API: ReturnType<typeof API>;
};

export const Router: Record<PageType, (props: PageProps) => () => JSX.Element> =
  {
    start: (props) => () => <StartPage {...props} />,
    newOrder: (props) => () => <NewOrderPage {...props} />,
    newRestaurant: (props) => () => <NewRestaurantPage {...props} />,
  };

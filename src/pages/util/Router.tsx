import API from "@api/api";
import { NewOrderPage } from "@pages/NewOrderPage";
import { NewRestaurantPage } from "@pages/NewRestaurantPage";
import { StartPage } from "@pages/StartPage";
import { AppData, AppState } from "@util/StateTypes";
import { Accessor, JSX, Setter } from "solid-js";

export type PageType = "start" | "newOrder" | "newRestaurant";

export type PageProps = {
  data: AppData;
  stateSignal: [Accessor<AppState>, Setter<AppState>];
  API: ReturnType<typeof API>;
};

export const Router: Record<PageType, (props: PageProps) => () => JSX.Element> =
  {
    start: (props) => () => <StartPage {...props} />,
    newOrder: (props) => () => <NewOrderPage {...props} />,
    newRestaurant: (props) => () => <NewRestaurantPage {...props} />,
  };

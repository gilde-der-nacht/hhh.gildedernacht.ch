import { Footer } from "@components/layout/Footer";
import { Header } from "@components/layout/Header";
import {
  NetworkError,
  NewLocationPage,
  NewOrderPage,
  OrderDetailsPage,
  StartPage,
} from "@pages/index";
import { pageError, PageType } from "@pages/Router";
import { loadServerData } from "@util/api";
import { getActiveOrder } from "@util/utils";
import { DateTime } from "luxon";
import { Component, createSignal, JSX, onMount } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AppState } from "StateType";

const App: Component = () => {
  const [page, setPage] = createSignal<PageType>("start");
  const [activeOrder, setActiveOrder] = createSignal("");
  const [now, setNow] = createSignal(DateTime.now());
  const [state, setState] = createSignal<AppState>({
    restaurants: [],
    orders: [],
    entries: [],
  });

  onMount(() => {
    loadServerData(setState, now()).catch((e) => {
      console.error(e);
      setPage("networkError");
    });
  });

  const pages: {
    [_ in PageType]: () => JSX.Element;
  } = {
    start: () => (
      <StartPage
        state={state()}
        link={setPage}
        setActiveOrder={setActiveOrder}
        now={now()}
      />
    ),
    newOrder: () => (
      <NewOrderPage link={setPage} restaurants={state().restaurants} />
    ),
    newLocation: () => (
      <NewLocationPage link={setPage} restaurants={state().restaurants} />
    ),
    orderDetails: () => (
      <OrderDetailsPage
        state={state()}
        link={setPage}
        fallback={pageError}
        activeOrder={getActiveOrder(activeOrder(), state().orders)}
      />
    ),
    networkError: () => <NetworkError />,
  };

  return (
    <div class="hhh-body">
      <Header link={setPage} />
      <div>
        <div class="container p-5">
          <Dynamic component={pages[page()]} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

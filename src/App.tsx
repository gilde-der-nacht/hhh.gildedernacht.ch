import { Footer } from "@components/layout/Footer";
import { Header } from "@components/layout/Header";
import { NewLocationPage } from "@pages/NewLocationPage";
import { NewOrderPage } from "@pages/NewOrderPage";
import { OrderDetailsPage } from "@pages/OrderDetailsPage";
import { pageError, PageType } from "@pages/Router";
import { StartPage } from "@pages/StartPage";
import { loadServerData } from "@util/api";
import { getActiveOrder } from "@util/utils";
import { DateTime } from "luxon";
import { Component, createEffect, createSignal, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AppState } from "StateType";

const App: Component = () => {
  const [page, setPage] = createSignal<PageType>("start");
  const [activeOrder, setActiveOrder] = createSignal("");
  const [now, setNow] = createSignal(DateTime.now());
  const [state, setState] = createSignal<AppState>({
    restaurants: [],
    orders: [],
    entries: [
      {
        id: "1",
        eater: "Oliver",
        comment: "This is a comment",
        menuItem: "Pizza Hawaii",
        orderId: "3",
        active: true,
        timestamp: DateTime.now(),
      },
      {
        id: "2",
        eater: "Oliver",
        comment: "This is a comment",
        menuItem: "Kebab",
        orderId: "3",
        active: true,
        timestamp: DateTime.now(),
      },
      {
        id: "3",
        eater: "Oliver",
        comment: "This is a comment",
        menuItem: "Pizza Proscuttio",
        orderId: "1",
        active: true,
        timestamp: DateTime.now(),
      },
    ],
  });
  loadServerData(setState, now());

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

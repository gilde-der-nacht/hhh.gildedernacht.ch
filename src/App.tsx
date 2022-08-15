import { Footer } from "@components/layout/Footer";
import { Header } from "@components/layout/Header";
import { Notification } from "@components/static/Notification";
import { NewLocationPage } from "@pages/NewLocationPage";
import { NewOrderPage } from "@pages/NewOrderPage";
import { OrderDetailsPage } from "@pages/OrderDetailsPage";
import type { PageType } from "@pages/PageTypes";
import { StartPage } from "@pages/StartPage";
import { loadServerData } from "@util/api";
import { getActiveOrder } from "@util/utils";
import { DateTime } from "luxon";
import type { Component } from "solid-js";
import { createSignal, Match, Switch } from "solid-js";
import type { AppState } from "StateType";

const pageError = () => (
  <Notification color="danger">
    <div class="content">
      <p>Leider ist ein Fehler aufgetreten. Versuche die Seite neuzuladen. </p>
      <p>
        Erhältst du den Fehler erneut, schreibe uns bitte eine Nachricht per{" "}
        <a href="https://gildedernacht.ch/kontakt/">Kontaktformular</a>.
      </p>
    </div>
  </Notification>
);

const App: Component = () => {
  const [page, setPage] = createSignal<PageType>("start");
  const [activeOrder, setActiveOrder] = createSignal("");
  const [now, setNow] = createSignal(DateTime.now());
  const [state, setState] = createSignal<AppState>({
    restaurants: [
      {
        id: "a730c359-b2b0-48bd-9bc4-e18fbbba2d2c",
        label: "Dieci Luzern",
        menu: "https://www.dieci.ch/de/",
        active: true,
        timestamp: DateTime.now(),
      },
      {
        id: "a730c359-b2b0-48bd-9bc4-e18fbbba2d2d",
        label: "Kebab und Pizza Haus Ebikon",
        menu: "https://www.just-eat.ch/speisekarte/kebab-und-pizza-haus",
        active: true,
        timestamp: DateTime.now(),
      },
    ],
    orders: [
      {
        id: "1",
        name: "Oliver",
        restaurantId: "a730c359-b2b0-48bd-9bc4-e18fbbba2d2d",
        timestamp: DateTime.fromISO("2022-08-14T20:06:00"),
        timeWindow: 60,
        displayState: "open",
        active: true,
      },
      {
        id: "2",
        name: "Oliver asd fasdf as",
        restaurantId: "a730c359-b2b0-48bd-9bc4-e18fbbba2d2c",
        timestamp: DateTime.fromISO("2021-08-14T19:08:08"),
        timeWindow: 60,
        displayState: "closed",
        active: true,
      },
      {
        id: "3",
        name: "Oliver asd a",
        restaurantId: "a730c359-b2b0-48bd-9bc4-e18fbbba2d2c",
        timestamp: DateTime.fromISO("2022-08-14T18:35:00"),
        timeWindow: 120,
        displayState: "open",
        active: true,
      },
    ],
    entries: [
      {
        id: "1",
        name: "Oliver",
        comment: "This is a comment",
        menuItem: "Pizza Hawaii",
        orderId: "3",
        active: true,
        timestamp: DateTime.now(),
      },
      {
        id: "2",
        name: "Oliver",
        comment: "This is a comment",
        menuItem: "Kebab",
        orderId: "3",
        active: true,
        timestamp: DateTime.now(),
      },
      {
        id: "3",
        name: "Oliver",
        comment: "This is a comment",
        menuItem: "Pizza Proscuttio",
        orderId: "1",
        active: true,
        timestamp: DateTime.now(),
      },
    ],
  });

  loadServerData(setState);

  return (
    <div class="hhh-body">
      <Header />
      <div>
        <div class="container p-5">
          <Switch fallback={pageError()}>
            <Match when={page() === "start"}>
              <StartPage
                state={state()}
                link={setPage}
                setActiveOrder={setActiveOrder}
                now={now()}
              />
            </Match>
            <Match when={page() === "newOrder"}>
              <NewOrderPage link={setPage} restaurants={state().restaurants} />
            </Match>
            <Match when={page() === "newLocation"}>
              <NewLocationPage
                link={setPage}
                restaurants={state().restaurants}
              />
            </Match>
            <Match when={page() === "orderDetails"}>
              <OrderDetailsPage
                state={state()}
                link={setPage}
                fallback={pageError}
                activeOrder={getActiveOrder(activeOrder(), state().orders)}
              />
            </Match>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

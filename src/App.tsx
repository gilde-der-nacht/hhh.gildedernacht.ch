import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { NewLocationPage } from "@/page/NewLocationPage";
import { NewOrderPage } from "@/page/NewOrderPage";
import { OrderDetailsPage } from "@/page/OrderDetailsPage";
import type { PageType } from "@/page/PageTypes";
import { StartPage } from "@/page/StartPage";
import { Notification } from "@/static/Notification";
import { getActiveOrder } from "@util/utils";
import { DateTime } from "luxon";
import { Component, createSignal, Match, Switch } from "solid-js";
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
  const [state, setState] = createSignal<AppState>({
    restaurants: [
      {
        id: "1",
        label: "Dieci Luzern",
        menu: "https://www.dieci.ch/de/",
      },
      {
        id: "2",
        label: "Kebab und Pizza Haus Ebikon",
        menu: "https://www.just-eat.ch/speisekarte/kebab-und-pizza-haus",
      },
    ],
    orders: [
      {
        id: "1",
        name: "Oliver",
        restaurantId: "1",
        timestamp: DateTime.fromISO("2017-05-15T08:30:00"),
        timeWindow: 60,
        displayState: "open",
      },
      {
        id: "2",
        name: "Oliver asd fasdf as",
        restaurantId: "1",
        timestamp: DateTime.fromISO("2017-05-15T08:30:00"),
        timeWindow: 60,
        displayState: "closed",
      },
      {
        id: "3",
        name: "Oliver asd a",
        restaurantId: "2",
        timestamp: DateTime.fromISO("2017-05-15T08:30:00"),
        timeWindow: 120,
        displayState: "open",
      },
    ],
  });

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
              />
            </Match>
            <Match when={page() === "newOrder"}>
              <NewOrderPage link={setPage} restaurants={state().restaurants} />
            </Match>
            <Match when={page() === "newLocation"}>
              <NewLocationPage link={setPage} />
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

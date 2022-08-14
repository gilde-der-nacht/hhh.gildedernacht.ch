import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { NewLocationPage } from "@/page/NewLocationPage";
import { NewOrderPage } from "@/page/NewOrderPage";
import type { PageType } from "@/page/PageTypes";
import { StartPage } from "@/page/StartPage";
import { Notification } from "@/static/Notification";
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
  const [state, setState] = createSignal<AppState>({
    restaurants: [
      {
        label: "Dieci Luzern",
        menu: "https://www.dieci.ch/de/",
      },
      {
        label: "Kebab und Pizza Haus Ebikon",
        menu: "https://www.just-eat.ch/speisekarte/kebab-und-pizza-haus",
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
              <StartPage link={setPage} />
            </Match>
            <Match when={page() === "newOrder"}>
              <NewOrderPage link={setPage} restaurants={state().restaurants} />
            </Match>
            <Match when={page() === "newLocation"}>
              <NewLocationPage link={setPage} />
            </Match>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

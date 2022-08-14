import type { Component } from "solid-js";
import { createSignal, Match, Switch } from "solid-js";
import type { PageType } from "@/page/PageTypes";
import { StartPage } from "@/page/StartPage";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { Notification } from "@/static/Notification";
import { NewOrderPage } from "@/page/NewOrderPage";
import { NewLocationPage } from "@/page/NewLocationPage";

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
              <NewOrderPage link={setPage} />
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

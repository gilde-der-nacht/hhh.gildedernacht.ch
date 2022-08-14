import type { Component } from "solid-js";
import { createSignal, Match, Switch } from "solid-js";
import type { PageType } from "./components/page/PageTypes";
import { StartPage } from "./components/page/StartPage";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Notification } from "./components/static/Notification";

const error = () => (
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
          <Switch fallback={error()}>
            <Match when={page() === "start"}>
              <StartPage
                startNewOrder={() => {
                  setPage("newOrder");
                }}
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

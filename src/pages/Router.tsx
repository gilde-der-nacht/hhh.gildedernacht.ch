import { Notification } from "@components/static/Notification";
import { JSX } from "solid-js";
import { AppState } from "StateType";

export type PageType = "start" | "newOrder" | "newLocation" | "orderDetails";

export const Router:
  | {
      [_ in PageType]: (
        state: AppState,
        link: (page: PageType) => void
      ) => () => JSX.Element;
    }
  | {} = {};

export const pageError = () => (
  <Notification color="danger">
    <div class="content">
      <p>
        Leider ist ein <strong>unbekannter Fehler</strong> aufgetreten. Versuche
        die Seite neuzuladen.{" "}
      </p>
      <p>
        Erhältst du den Fehler erneut, schreibe uns bitte eine Nachricht per{" "}
        <a href="https://gildedernacht.ch/kontakt/">Kontaktformular</a>.
      </p>
    </div>
  </Notification>
);

export const networkError = () => (
  <Notification color="danger">
    <div class="content">
      <p>Leider ist ein <strong>Netzwerk-Fehler</strong> aufgetreten. Versuche die Seite neuzuladen. </p>
      <p>
        Erhältst du den Fehler erneut, schreibe uns bitte eine Nachricht per{" "}
        <a href="https://gildedernacht.ch/kontakt/">Kontaktformular</a>.
      </p>
    </div>
  </Notification>
);

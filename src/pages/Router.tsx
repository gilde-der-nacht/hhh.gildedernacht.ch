import API from "@api/api";
import { Notification } from "@components/static/Notification";
import { NetworkError } from "@pages/NetworkError";
import { NewLocationPage } from "@pages/NewLocationPage";
import { NewOrderPage } from "@pages/NewOrderPage";
import { StartPage } from "@pages/StartPage";
import { AppState } from "@util/StateTypes";
import { JSX } from "solid-js";

export type PageType = "start" | "newOrder" | "newLocation" | "networkError";

export type PageProps = {
  state: AppState;
  setPage: (page: PageType) => void;
  API: typeof API;
};

export const Router: {
  [_ in PageType]: (props: PageProps) => () => JSX.Element;
} = {
  start: (props) => () => <StartPage {...props} />,
  newOrder: (props) => () => <NewOrderPage {...props} />,
  newLocation: (props) => () => <NewLocationPage {...props} />,
  networkError: (_) => () => <NetworkError />,
};

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

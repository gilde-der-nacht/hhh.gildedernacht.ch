import { Notification } from "@components/static/Notification";

export const NetworkError = () => (
  <Notification type="danger">
    <div class="content">
      <p>
        Leider ist ein <strong>Netzwerk-Fehler</strong> aufgetreten. Versuche
        die Seite neuzuladen.
      </p>
      <p>
        Erhältst du den Fehler erneut, schreibe uns bitte eine Nachricht per{" "}
        <a href="https://gildedernacht.ch/kontakt/">Kontaktformular</a>.
      </p>
    </div>
  </Notification>
);

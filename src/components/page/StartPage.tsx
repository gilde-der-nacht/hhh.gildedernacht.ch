import { Component } from "solid-js";
import { Button } from "@/static/Button";
import { IconLeft } from "@/static/icons/IconLeft";
import type { PageType } from "./PageTypes";

type PageProps = {
  link: (page: PageType) => void;
};

export const StartPage: Component<PageProps> = ({ link }) => {
  return (
    <div class="hhh-spacer" style="--gap: 5rem;">
      <div>
        <h3 class="title is-3 has-text-centered">Aktive Bestellungen</h3>
      </div>
      <div>
        <h3 class="title is-3 has-text-centered">
          Starte eine neue Bestellung
        </h3>
        <div class="has-text-centered">
          <Button
            color="success"
            outlined={true}
            onClick={() => link("newOrder")}
          >
            <IconLeft icon="plus">Neue Bestellung</IconLeft>
          </Button>
        </div>
      </div>
      <div>
        <h3 class="title is-3 has-text-centered">
          Abgeschlossene Bestellungen
        </h3>
      </div>
    </div>
  );
};

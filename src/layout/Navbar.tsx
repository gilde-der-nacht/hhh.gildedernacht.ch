import { Button } from "@components/static/Button";
import { IconLeft } from "@components/static/icons/Icon";
import { PageType } from "@pages/Router";
import { Component } from "solid-js";

type Props = { setPage: (page: PageType) => void };

export const Navbar: Component<Props> = (props) => {
  return (
    <nav
      class="navbar is-light is-flex is-flex-wrap-wrap is-justify-content-center is-align-content-center"
      style="gap:1rem"
    >
      <div class="buttons has-addons">
        <Button onClick={() => props.setPage("start")} outlined={true}>
          <IconLeft icon="bars-staggered">Überblick</IconLeft>
        </Button>
        <Button
          onClick={() => props.setPage("newOrder")}
          color="success"
          outlined={true}
        >
          <IconLeft icon="receipt">Neue Bestellung</IconLeft>
        </Button>
        <Button
          onClick={() => props.setPage("newRestaurant")}
          color="danger"
          outlined={true}
        >
          <IconLeft icon="fork-knife">Neues Restaurant</IconLeft>
        </Button>
      </div>
    </nav>
  );
};

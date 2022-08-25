import { Button } from "@components/static/Button";
import { IconLeft } from "@components/static/icons/Icon";
import { PageType } from "@pages/util/Router";
import { Component } from "solid-js";

type Props = { setPage: (page: PageType) => void };

export const Navbar: Component<Props> = (props) => {
  return (
    <nav class="navbar is-light is-flex is-justify-content-center">
      <div class="buttons has-addons is-justify-content-center">
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

import { Button } from "@components/static/Button";
import { IconLeft } from "@components/static/icons/Icon";
import { PageType } from "@pages/util/Router";
import { JSX } from "solid-js";

type Props = { link: (page: PageType) => void };

export const Navbar = (props: Props): JSX.Element => {
  return (
    <nav class="navbar is-light is-flex is-justify-content-center">
      <div class="buttons has-addons is-justify-content-center">
        <Button onClick={() => props.link("start")} isOutlined={true}>
          <IconLeft icon="bars-staggered">Überblick</IconLeft>
        </Button>
        <Button
          onClick={() => props.link("newOrder")}
          color="success"
          isOutlined={true}
        >
          <IconLeft icon="receipt">Neue Bestellung</IconLeft>
        </Button>
        <Button
          onClick={() => props.link("newRestaurant")}
          color="danger"
          isOutlined={true}
        >
          <IconLeft icon="fork-knife">Neues Restaurant</IconLeft>
        </Button>
      </div>
    </nav>
  );
};

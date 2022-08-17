import { PageType } from "@pages/Router";
import { Component } from "solid-js";

type HeaderProps = {
  link: (page: PageType) => void;
};

export const Header: Component<HeaderProps> = (props) => {
  return (
    <header class="hero is-info">
      <a onClick={() => props.link("start")}>
        <div class="hero-body">
          <h1 class="title is-2 has-text-centered">Hungry Hungry Hippos</h1>
          <h2 class="subtitle is-4 has-text-centered is-italic">
            Gilde der Nacht
          </h2>
        </div>
      </a>
    </header>
  );
};

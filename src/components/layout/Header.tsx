import type { Component } from "solid-js";

export const Header: Component = () => {
  return (
    <header class="hero is-info">
      <div class="hero-body">
        <h1 class="title is-2 has-text-centered">Hungry Hungry Hippos</h1>
        <h2 class="subtitle is-4 has-text-centered is-italic">
          Gilde der Nacht
        </h2>
      </div>
    </header>
  );
};

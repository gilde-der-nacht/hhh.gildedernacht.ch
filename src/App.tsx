import type { Component } from "solid-js";
import { Footer } from "./compontents/static/Footer";
import { Header } from "./compontents/static/Header";

const App: Component = () => {
  return (
    <div class="hhh-body">
      <Header />
      <div class="container"></div>
      <Footer />
    </div>
  );
};

export default App;

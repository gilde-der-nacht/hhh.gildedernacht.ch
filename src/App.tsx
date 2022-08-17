import API, { loadServerData } from "@api/api";
import { Footer } from "@components/layout/Footer";
import { Header } from "@components/layout/Header";
import { PageType, Router } from "@pages/Router";
import { AppState } from "@util/StateTypes";
import { DateTime } from "luxon";
import { Component, createSignal, onMount } from "solid-js";
import { Dynamic } from "solid-js/web";

const App: Component = () => {
  const [page, setPage] = createSignal<PageType>("start");
  const [now, setNow] = createSignal(DateTime.now());
  const [state, setState] = createSignal<AppState>({
    restaurants: [],
    orders: [],
    entries: [],
  });

  onMount(() => {
    loadServerData(setState, now()).catch((e) => {
      console.error(e);
      setPage("networkError");
    });
  });

  return (
    <div class="hhh-body">
      <Header link={setPage} />
      <div>
        <div class="container p-5">
          <Dynamic
            component={Router[page()]({
              state: state(),
              setPage: setPage,
              API,
            })}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

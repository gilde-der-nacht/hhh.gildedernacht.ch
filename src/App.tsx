import API, { loadServerResource } from "@api/api";
import { Footer } from "@components/layout/Footer";
import { Header } from "@components/layout/Header";
import { Progress } from "@components/static/Progress";
import { PageType, Router } from "@pages/Router";
import { DateTime } from "luxon";
import { Component, createResource, createSignal, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

const App: Component = () => {
  const [page, setPage] = createSignal<PageType>("start");
  const [now, setNow] = createSignal(DateTime.now());
  const [state, { refetch }] = createResource(now, loadServerResource);

  return (
    <div class="hhh-body">
      <Header link={setPage} />
      <div>
        <div class="container p-5">
          <Show when={state()} fallback={<Progress />}>
            {(state) => (
              <Dynamic
                component={Router[page()]({
                  state: state,
                  setPage: setPage,
                  API,
                })}
              />
            )}
          </Show>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

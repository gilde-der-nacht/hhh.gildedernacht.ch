import API, { loadServerResource } from "@api/api";
import { Footer } from "@components/layout/Footer";
import { Header } from "@components/layout/Header";
import { Progress } from "@components/static/Progress";
import { NetworkError } from "@pages/NetworkError";
import { PageType, Router } from "@pages/Router";
import { DateTime } from "luxon";
import {
  Component,
  createResource,
  createSignal,
  Match,
  Switch,
} from "solid-js";
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
          <Switch fallback={<Progress />}>
            <Match when={state()}>
              {(state) => (
                <Dynamic
                  component={Router[page()]({
                    state: state,
                    setPage: setPage,
                    API,
                  })}
                />
              )}
            </Match>
            <Match when={typeof state.error !== "undefined"}>
              <NetworkError />
            </Match>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

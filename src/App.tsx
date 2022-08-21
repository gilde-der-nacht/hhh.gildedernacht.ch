import API, { loadServerResource } from "@api/api";
import { Progress } from "@components/static/Progress";
import { Toast, ToastOptions } from "@components/static/Toast";
import { Footer } from "@layout/Footer";
import { Header } from "@layout/Header";
import { Layout } from "@layout/Layout";
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
  const [toast, setToast] = createSignal<ToastOptions>({});
  const [state, { refetch }] = createResource(now, loadServerResource);

  return (
    <Layout link={setPage} toast={toast()} setToast={setToast}>
      <div>
        <div class="container p-5">
          <Switch fallback={<Progress />}>
            <Match when={typeof state.error !== "undefined"}>
              <NetworkError />
            </Match>
            <Match when={state()}>
              {(state) => (
                <Dynamic
                  component={Router[page()]({
                    state: state,
                    setPage,
                    setToast,
                    API: API(refetch),
                  })}
                />
              )}
            </Match>
          </Switch>
        </div>
      </div>
    </Layout>
  );
};

export default App;

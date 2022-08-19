import API, { loadServerResource } from "@api/api";
import { Footer } from "@components/layout/Footer";
import { Header } from "@components/layout/Header";
import { Progress } from "@components/static/Progress";
import { Toast, ToastOptions } from "@components/Toast";
import { NetworkError } from "@pages/NetworkError";
import { PageType, Router } from "@pages/Router";
import { DateTime } from "luxon";
import {
  Component,
  createResource,
  createSignal,
  Match,
  Switch
} from "solid-js";
import { Dynamic } from "solid-js/web";

const App: Component = () => {
  const [page, setPage] = createSignal<PageType>("start");
  const [now, setNow] = createSignal(DateTime.now());
  const [toast, setToast] = createSignal<ToastOptions>({});
  const [state, { refetch }] = createResource(now, loadServerResource);

  return (
    <div class="hhh-body">
      <Header link={setPage} />
      <div>
        <div class="container p-5">
          <button
            onClick={() =>
              setToast((prev) => ({
                ...prev,
                waitFor: new Promise((res, rej) => {
                  setTimeout(() => res("done"), 5000);
                }),
                text: "Laden",
                type: "loading",
                visible: !prev.visible,
              }))
            }
          >
            toast
          </button>
          <Switch fallback={<Progress />}>
            <Match when={state()}>
              {(state) => (
                <Dynamic
                  component={Router[page()]({
                    state: state,
                    setPage,
                    setToast,
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
      <Toast
        {...toast()}
        hideToast={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
};

export default App;

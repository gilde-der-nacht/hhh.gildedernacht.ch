import API, { loadServerResource } from "@api/api";
import { NetworkError } from "@components/static/NetworkError";
import { Progress } from "@components/static/Progress";
import { ToastOptions } from "@components/static/Toast";
import { Layout } from "@layout/Layout";
import { PageType, Router } from "@pages/util/Router";
import { AppState, OrderState } from "@util/StateTypes";
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
  const [now, setNow] = createSignal(DateTime.now());
  const [data, { refetch }] = createResource(now, loadServerResource);
  const [state, setState] = createSignal<AppState>({
    page: "start",
    activeOrder: null,
    toast: {},
  });

  const changePageMiddleware = (page: PageType) => {
    if (page === "start") {
      setState((prev) => ({ ...prev, activeOrder: null }));
    }
    setState((prev) => ({ ...prev, page }));
  };

  const setToast = (toast: ToastOptions) =>
    setState((prev) => ({ ...prev, toast }));

  const hideToast = () =>
    setState((prev) => ({
      ...prev,
      toast: { ...prev.toast, isVisible: false },
    }));

  const setActiveOrder = (o: null | OrderState) =>
    setState((prev) => ({ ...prev, activeOrder: o }));

  return (
    <Layout
      link={changePageMiddleware}
      toast={state().toast}
      setToast={setToast}
      hideToast={hideToast}
    >
      <div>
        <div class="container p-5">
          <Switch fallback={<Progress />}>
            <Match when={typeof data.error !== "undefined"}>
              <NetworkError />
            </Match>
            <Match when={data()}>
              {(data) => (
                <Dynamic
                  component={Router[state().page]({
                    data: data,
                    activeOrder: state().activeOrder,
                    setActiveOrder,
                    setPage: changePageMiddleware,
                    setToast,
                    API: API({ refetch, setToast }),
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

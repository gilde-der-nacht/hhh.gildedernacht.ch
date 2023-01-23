import API, { loadServerResource } from "@api/api";
import { NetworkError } from "@components/static/NetworkError";
import { Progress } from "@components/static/Progress";
import { Layout } from "@layout/Layout";
import { Router } from "@pages/util/Router";
import { AppState } from "@util/StateTypes";
import { setToast } from "@util/utils";
import { DateTime } from "luxon";
import { createResource, createSignal, JSX, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";

const App = (): JSX.Element => {
  const [now, setNow] = createSignal(DateTime.now());
  const [data, { refetch }] = createResource(now, loadServerResource);
  const [state, setState] = createSignal<AppState>({
    page: "start",
    activeOrder: null,
    toast: {},
    showRestaurantList: false,
    showOrderList: false,
    showEntryList: false,
  });

  return (
    <Layout stateSignal={[state, setState]}>
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
                    data,
                    stateSignal: [state, setState],
                    API: API({ refetch, setToast: setToast(setState) }),
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

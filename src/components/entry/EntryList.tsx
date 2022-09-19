import { EntryListItem } from "@components/entry/EntryListItem";
import { Button } from "@components/static/Button";
import { Icon } from "@components/static/icons/Icon";
import { Notification } from "@components/static/Notification";
import { AppState, EntryState } from "@util/StateTypes";
import { setShowEntryList } from "@util/utils";
import { Accessor, Component, For, Setter, Show } from "solid-js";

type Props = {
  activeEntries: readonly EntryState[];
  inactiveEntries: readonly EntryState[];
  deactivateEntry: (entry: EntryState) => void;
  reactivateEntry: (entry: EntryState) => void;
  removeEntry: (entry: EntryState) => void;
  stateSignal: [Accessor<AppState>, Setter<AppState>];
};

export const EntryList: Component<Props> = (props) => {
  const [state, setState] = props.stateSignal;

  return (
    <>
      <Show
        when={props.activeEntries.length > 0}
        fallback={
          <Notification kind="info">
            <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-center">
              <p>
                <em>Keine aktiven Einträge gefungen.</em>
              </p>
            </div>
          </Notification>
        }
      >
        <div class="hhh-spacer" style="--gap: 1rem;">
          <For each={props.activeEntries}>
            {(entry) => (
              <EntryListItem isDisabled={false} entry={entry}>
                <Button
                  color="danger"
                  onClick={() => props.deactivateEntry(entry)}
                >
                  <Icon icon="circle-stop" />
                </Button>
              </EntryListItem>
            )}
          </For>
        </div>
      </Show>
      <Show when={props.inactiveEntries.length > 0}>
        <Show
          when={state().showEntryList}
          fallback={
            <Button onClick={() => setShowEntryList(setState)(true)}>
              Zeige deaktivierte Einträge
            </Button>
          }
        >
          <For each={props.inactiveEntries}>
            {(entry) => (
              <EntryListItem isDisabled={true} entry={entry}>
                <div class="buttons has-addons">
                  <Button
                    color="success"
                    onClick={() => props.reactivateEntry(entry)}
                  >
                    <Icon icon="circle-play" />
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => props.removeEntry(entry)}
                  >
                    <Icon icon="trash" />
                  </Button>
                </div>
              </EntryListItem>
            )}
          </For>
        </Show>
      </Show>
    </>
  );
};

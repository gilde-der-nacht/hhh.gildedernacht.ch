import { EntryListItem } from "@components/entry/EntryListItem";
import { Button } from "@components/static/Button";
import { Icon } from "@components/static/icons/Icon";
import { EntryState } from "@util/StateTypes";
import { Component, For, Show } from "solid-js";

type Props = {
  activeEntries: readonly EntryState[];
  inactiveEntries: readonly EntryState[];
  deactivateEntry: (entry: EntryState) => void;
  reactivateEntry: (entry: EntryState) => void;
  removeEntry: (entry: EntryState) => void;
};

export const EntryList: Component<Props> = (props) => {
  return (
    <>
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
      <Show when={true}>
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
                <Button color="danger" onClick={() => props.removeEntry(entry)}>
                  <Icon icon="trash" />
                </Button>
              </div>
            </EntryListItem>
          )}
        </For>
      </Show>
    </>
  );
};

import { EntryListItem } from "@components/entry/EntryListItem";
import { Button } from "@components/static/Button";
import { Icon } from "@components/static/icons/Icon";
import { EntryState } from "@util/StateTypes";
import { Component, For } from "solid-js";

type Props = {
  activeEntries: readonly EntryState[];
  inactiveEntries: readonly EntryState[];
};

export const EntryList: Component<Props> = (props) => {
  return (
    <div class="hhh-spacer" style="--gap: 1rem;">
      <For each={props.activeEntries}>
        {(entry) => (
          <EntryListItem isDisabled={false} entry={entry}>
            <Button color="danger" onClick={() => {}}>
              <Icon icon="circle-stop" />
            </Button>
          </EntryListItem>
        )}
      </For>
    </div>
  );
};

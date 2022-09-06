import { EntryPost } from "@api/ApiTypes";
import { Button } from "@components/static/Button";
import { Card } from "@components/static/Card";
import { Form } from "@components/static/forms/Form";
import { Input } from "@components/static/forms/Input";
import { IconLeft } from "@components/static/icons/Icon";
import { isEmpty } from "@util/utils";
import { Component, createSignal } from "solid-js";

type Props = {
  orderId: string;
  createEntry: (
    entry: Omit<EntryPost, "status" | "id" | "kind">
  ) => Promise<Response>;
};

export const NewEntryForm: Component<Props> = (props) => {
  const [eater, setEater] = createSignal("");
  const [menuItem, setMenuItem] = createSignal("");
  const [comment, setComment] = createSignal("");
  const [activeValidation, setActiveValidation] = createSignal(false);

  const formSubmit = (e: Event) => {
    e.preventDefault();
    setActiveValidation(true);
    if (!isEmpty(eater()) && !isEmpty(menuItem())) {
      const promise = props.createEntry({
        orderId: props.orderId,
        eater: eater(),
        menuItem: menuItem(),
        comment: comment(),
      });
      promise.then(() => {
        setActiveValidation(false);
        setEater("");
        setMenuItem("");
        setComment("");
      });
    }
  };

  return (
    <Card>
      <h4 class="title is-4 has-text-centered">Neuer Eintrag</h4>
      <Form>
        <Input
          label="Besteller"
          placeholder="Dein Name"
          helpText="Damit wir wissen, wer was bestellt hat."
          error={{
            status: activeValidation() && isEmpty(eater()),
            text: "Pflichtfeld",
          }}
          value={eater()}
          setter={setEater}
        />
        <Input
          label="Menü"
          placeholder="Was möchtest du gerne bestellen?"
          error={{
            status: activeValidation() && isEmpty(menuItem()),
            text: "Pflichtfeld",
          }}
          value={menuItem()}
          setter={setMenuItem}
        />
        <Input
          label="Kommentar"
          placeholder="kann leer gelassen werden"
          value={comment()}
          setter={setComment}
        />
        <div
          class="pt-5 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
          style="gap: 1rem;"
        >
          <Button
            color="success"
            large={true}
            onClick={formSubmit}
            isSubmit={true}
          >
            <IconLeft icon="check">Eintrag hinzufügen</IconLeft>
          </Button>
        </div>
      </Form>
    </Card>
  );
};

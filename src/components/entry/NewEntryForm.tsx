import { EntryUpdatePost } from "@api/ApiTypes";
import { Button } from "@components/static/Button";
import { Card } from "@components/static/Card";
import { Form } from "@components/static/forms/Form";
import { Input } from "@components/static/forms/Input";
import { IconLeft } from "@components/static/icons/Icon";
import { isEmpty } from "@util/utils";
import { createSignal, JSX } from "solid-js";

type Props = {
  orderId: string;
  menuLink: string;
  createEntry: (
    entry: Omit<EntryUpdatePost, "status" | "id" | "kind" | "created">
  ) => Promise<Response>;
};

export const NewEntryForm = (props: Props): JSX.Element => {
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
    <Card showStatusTag={false}>
      <h4 class="title is-4 has-text-centered">Neuer Eintrag</h4>
      <p>
        Suche dir unter{" "}
        <a href={props.menuLink} target="_blank">
          {props.menuLink}
        </a>{" "}
        ein Menü aus, dass du gerne bestellen möchtest.
      </p>
      <Form>
        <Input
          label="Hungrige | Hungriger"
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
            isLarge={true}
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

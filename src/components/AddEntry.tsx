import type { Component } from "solid-js";
import { Button } from "./static/Button";
import { Form } from "./static/forms/Form";
import { Input } from "./static/forms/Input";
import { IconLeft } from "./static/icons/IconLeft";

export const AddEntry: Component = () => {
  return (
    <div>
      <h4 class="title is-4 has-text-centered">Weiteren Eintrag hinzufügen</h4>
      <Form>
        <Input
          label="Besteller"
          placeholder="Dein Name"
          helptext="Damit wir wissen, wer diesen Eintrag erstellt hat und für das Essen bezahlt."
        />
        <Input
          label="Menüeintrag"
          placeholder="z.B. Pizza XY, Kebap Döner"
          helptext="Bitte verwende den selben Namen, wie auf der Menüseite."
        />
        <Input
          label="Kommentar"
          placeholder="z.B. Kleine Pizza, Jogurtsauce"
          helptext="Es können nur Wünsche berücksichtig werden, die das Restaurant auch zulässt. Wenn du Infos weglässt (z.B. die Grösse der Pizza), gehen wir von den Standardeinstellungen aus."
        />
        <Button color="success" onClick={() => {}}>
          <IconLeft icon="check">Eintrag hinzufügen</IconLeft>
        </Button>
      </Form>
    </div>
  );
};

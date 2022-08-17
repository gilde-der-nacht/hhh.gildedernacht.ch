import { LocationDropdown } from "@components/LocationDropdown";
import { Button } from "@components/static/Button";
import { Form } from "@components/static/forms/Form";
import { Input } from "@components/static/forms/Input";
import { NumberInput } from "@components/static/forms/NumberInput";
import { IconLeft } from "@components/static/icons/IconLeft";
import { saveNewOrder } from "@util/api";
import { isEmpty } from "@util/utils";
import { Component, createSignal, onMount } from "solid-js";
import { Restaurant } from "StateType";
import { PageType } from "./Router";

type PageProps = {
  link: (page: PageType) => void;
  restaurants: Restaurant[];
};

const MIN_TIME_WINDOW_MIN = 10;

export const NewOrderPage: Component<PageProps> = (props) => {
  const [restaurant, setRestaurant] = createSignal("");
  const [orderer, setOrderer] = createSignal("");
  const [timeWindow, setTimeWindow] = createSignal(30);
  const [activeValidation, setActiveValidation] = createSignal(false);

  const activeRestaurants = () => props.restaurants.filter((r) => r.active);

  const formSubmit = async (e: Event) => {
    e.preventDefault();
    setActiveValidation(true);
    if (
      !isEmpty(restaurant()) &&
      !isEmpty(orderer()) &&
      isValidTimeWindow(timeWindow())
    ) {
      await saveNewOrder({
        restaurantId: restaurant(),
        orderer: orderer(),
        timeWindow: timeWindow(),
      });
    }
  };

  const isValidTimeWindow = (time: number) =>
    !isNaN(time) && time >= MIN_TIME_WINDOW_MIN;

  onMount(() => setRestaurant(props.restaurants[0].id));

  return (
    <div class="hhh-spacer">
      <h3 class="title is-3 has-text-centered">Neue Bestellung</h3>
      <Form>
        <LocationDropdown
          activeRestaurants={activeRestaurants()}
          error={{
            status: activeValidation() && isEmpty(restaurant()),
            text: "Pflichtfeld",
          }}
          setter={setRestaurant}
        >
          <Button
            color="success"
            outlined={true}
            onClick={() => props.link("newLocation")}
          >
            <IconLeft icon="plus">Neues Restaurant</IconLeft>
          </Button>
        </LocationDropdown>
        <Input
          label="Besteller"
          placeholder="Dein Name"
          helpText="Damit alle wissen, wer diese Bestellung abschickt."
          error={{
            status: activeValidation() && isEmpty(orderer()),
            text: "Pflichtfeld",
          }}
          setter={setOrderer}
        />
        <NumberInput
          label="Zeitfenster (in Minuten)"
          startValue={timeWindow()}
          helptext="Wie lange haben die anderen Personen Zeit ihre Bestellung einzugeben."
          error={{
            status: activeValidation() && !isValidTimeWindow(timeWindow()),
            text: `Muss mindestens ${MIN_TIME_WINDOW_MIN} Minuten sein.`,
          }}
          setter={setTimeWindow}
        />
        <div
          class="pt-5 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
          style="gap: 1rem;"
        >
          <Button
            color="danger"
            outlined={true}
            large={true}
            onClick={() => props.link("start")}
          >
            <IconLeft icon="arrow-left">Zurück</IconLeft>
          </Button>
          <Button color="success" large={true} onClick={formSubmit}>
            <IconLeft icon="check">Bestellung starten</IconLeft>
          </Button>
        </div>
      </Form>
    </div>
  );
};

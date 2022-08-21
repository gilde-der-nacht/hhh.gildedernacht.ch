import { RestaurantDropdown } from "@components/restaurant/RestaurantDropdown";
import { Button } from "@components/static/Button";
import { Form } from "@components/static/forms/Form";
import { Input } from "@components/static/forms/Input";
import { NumberInput } from "@components/static/forms/NumberInput";
import { IconLeft } from "@components/static/icons/Icon";
import { PageProps } from "@pages/Router";
import { isEmpty } from "@util/utils";
import { Component, createSignal, onMount } from "solid-js";

export const NewOrderPage: Component<PageProps> = (props) => {
  const [restaurantId, setRestaurantId] = createSignal("");
  const [orderer, setOrderer] = createSignal("");
  const [comment, setComment] = createSignal("");
  const [timeWindow, setTimeWindow] = createSignal(30);
  const [activeValidation, setActiveValidation] = createSignal(false);

  const activeRestaurants = () =>
    props.state.restaurants.filter((r) => r.status === "active");

  const formSubmit = (e: Event) => {
    e.preventDefault();
    setActiveValidation(true);
    if (
      !isEmpty(restaurantId()) &&
      !isEmpty(orderer()) &&
      isValidTimeWindow(timeWindow())
    ) {
      const promise = props.API.saveNewOrder({
        restaurantId: restaurantId(),
        orderer: orderer(),
        comment: comment(),
        timeWindow: timeWindow(),
      });
      props.setToast({
        visible: true,
        text: "Bestellung speichern ...",
        kind: "loading",
        waitFor: {
          promise,
          onSuccessMessage: "Bestellung gespeichert.",
          onErrorMessage:
            "Bestellung konnte nicht gespeichert werden, bitte versuche es erneut",
        },
      });
      promise.then(() => {
        setActiveValidation(false);
        setOrderer("");
        setComment("");
        setTimeWindow(30);
      });
    }
  };

  const isValidTimeWindow = (time: number) => !isNaN(time) && time >= 0;

  onMount(() =>
    setRestaurantId(
      activeRestaurants().length > 0 ? activeRestaurants()[0].id : ""
    )
  );

  return (
    <div class="hhh-spacer">
      <h3 class="title is-3 has-text-centered">
        <IconLeft icon="receipt">
          <span class="pl-2">Neue Bestellungen</span>
        </IconLeft>
      </h3>
      <Form>
        <RestaurantDropdown
          activeRestaurants={activeRestaurants()}
          error={{
            status: activeValidation() && isEmpty(restaurantId()),
            text: "Pflichtfeld",
          }}
          setter={setRestaurantId}
        >
          <Button
            color="danger"
            outlined={true}
            onClick={() => props.setPage("newRestaurant")}
          >
            <IconLeft icon="fork-knife">Neues Restaurant</IconLeft>
          </Button>
        </RestaurantDropdown>
        <Input
          label="Besteller"
          placeholder="Dein Name"
          helpText="Damit alle wissen, wer diese Bestellung organisiert."
          error={{
            status: activeValidation() && isEmpty(orderer()),
            text: "Pflichtfeld",
          }}
          value={orderer()}
          setter={setOrderer}
        />
        <NumberInput
          label="Zeitfenster (in Minuten)"
          helptext="Wie lange haben die anderen Personen Zeit ihre Bestellung einzugeben."
          error={{
            status: activeValidation() && !isValidTimeWindow(timeWindow()),
            text: "Zeit darf nicht negativ sein.",
          }}
          value={timeWindow()}
          setter={setTimeWindow}
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
            <IconLeft icon="check">Bestellung starten</IconLeft>
          </Button>
        </div>
      </Form>
    </div>
  );
};

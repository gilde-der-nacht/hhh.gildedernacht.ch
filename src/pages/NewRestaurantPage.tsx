import { Button } from "@components/static/Button";
import { Card } from "@components/static/Card";
import { Form } from "@components/static/forms/Form";
import { Input } from "@components/static/forms/Input";
import { Icon, IconLeft } from "@components/static/icons/Icon";
import { Notification } from "@components/static/Notification";
import { PageProps } from "@pages/Router";
import { isEmpty, isValidUrl } from "@util/utils";
import { Component, createSignal, For, Show } from "solid-js";

export const NewRestaurantPage: Component<PageProps> = (props) => {
  const [showList, setShowList] = createSignal(false);
  const [restaurant, setRestaurant] = createSignal("");
  const [menulink, setMenulink] = createSignal("");
  const [comment, setComment] = createSignal("");
  const [activeValidation, setActiveValidation] = createSignal(false);

  const activeRestaurants = () =>
    props.state.restaurants.filter((r) => r.status === "active");
  const inactiveRestaurants = () =>
    props.state.restaurants.filter((r) => r.status === "inactive");

  const formSubmit = (e: Event) => {
    e.preventDefault();
    setActiveValidation(true);
    if (!isEmpty(restaurant()) && isValidUrl(menulink())) {
      const promise = props.API.saveNewRestaurant({
        label: restaurant(),
        menuLink: menulink(),
        comment: comment(),
      });
      props.setToast({
        visible: true,
        text: "Restaurant speichern ...",
        kind: "loading",
        waitFor: {
          promise,
          onSuccessMessage: "Restaurant gespeichert.",
          onErrorMessage:
            "Restaurant konnte nicht gespeichert werden, bitte versuche es erneut",
        },
      });
      promise.then(() => {
        setActiveValidation(false);
        setRestaurant("");
        setMenulink("");
        setComment("");
      });
    }
  };

  return (
    <div class="hhh-spacer" style="--gap: 5rem;">
      <div>
        <h3 class="title is-3 has-text-centered">
          <IconLeft icon="fork-knife">
            <span class="pl-2">Neues Restaurant</span>
          </IconLeft>
        </h3>
        <Form>
          <Input
            label="Restaurant"
            placeholder="Name des Restaurant"
            helpText="Der Name des Restaurants, der überall verwendet wird."
            error={{
              status: activeValidation() && isEmpty(restaurant()),
              text: "Pflichtfeld",
            }}
            value={restaurant()}
            setter={setRestaurant}
          />
          <Input
            label="Menülink"
            placeholder="https://..."
            isUrl={true}
            helpText="Unter welchem Link das Menü des Restaurants eingesehen werden kann."
            error={{
              status: activeValidation() && !isValidUrl(menulink()),
              text: "Pflichtfeld, muss mit 'https://' starten.",
            }}
            value={menulink()}
            setter={setMenulink}
          />
          <Input
            label="Kommentar"
            placeholder="kann leer gelassen werden"
            required={false}
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
              <IconLeft icon="check">Restaurant hinzufügen</IconLeft>
            </Button>
          </div>
        </Form>
      </div>
      <Show
        when={showList()}
        fallback={
          <Button onClick={() => setShowList(true)}>
            Zeige Liste der Restaurants
          </Button>
        }
      >
        <div>
          <h3 class="title is-3 has-text-centered">Restaurant Liste</h3>
          <Show
            when={
              activeRestaurants().length === 0 &&
              inactiveRestaurants().length === 0
            }
          >
            <Notification kind="info">
              <em>Keine (aktiven oder inaktiven) Restaurants gefunden.</em>
            </Notification>
          </Show>
          <div class="hhh-spacer" style="--gap: 1rem;">
            <For each={activeRestaurants()}>
              {(restaurant) => (
                <Card isDisabled={false}>
                  <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
                    <div>
                      <h5 class="m-0">{restaurant.label}</h5>
                      <p class="is-italic">
                        <a href={restaurant.menuLink}>{restaurant.menuLink}</a>
                      </p>
                      <Show when={restaurant.comment.trim().length > 0}>
                        <p class="is-italic">{restaurant.comment}</p>
                      </Show>
                    </div>
                    <Button
                      color="danger"
                      onClick={() =>
                        props.API.deactivateRestaurant(restaurant).catch(
                          (e) => {
                            console.error(e);
                          }
                        )
                      }
                    >
                      <Icon icon="octagon-minus" />
                    </Button>
                  </div>
                </Card>
              )}
            </For>
            <For each={inactiveRestaurants()}>
              {(restaurant) => (
                <Card isDisabled={true}>
                  <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
                    <div>
                      <h5 class="m-0">{restaurant.label}</h5>
                      <p class="is-italic">
                        <a href={restaurant.menuLink}>{restaurant.menuLink}</a>
                      </p>
                      <Show when={restaurant.comment.trim().length > 0}>
                        <p class="is-italic">{restaurant.comment}</p>
                      </Show>
                    </div>
                    <div class="buttons has-addons">
                      <Button
                        color="success"
                        onClick={() =>
                          props.API.reactivateRestaurant(restaurant).catch(
                            (e) => {
                              console.error(e);
                            }
                          )
                        }
                      >
                        <Icon icon="octagon-plus" />
                      </Button>
                      <Button
                        color="danger"
                        onClick={() =>
                          props.API.deleteRestaurant(restaurant).catch((e) => {
                            console.error(e);
                          })
                        }
                      >
                        <Icon icon="trash" />
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};

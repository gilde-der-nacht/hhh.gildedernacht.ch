// import { Button } from "@components/static/Button";
// import { Form } from "@components/static/forms/Form";
// import { Input } from "@components/static/forms/Input";
// import { IconLeft } from "@components/static/icons/IconLeft";
// import { PageType } from "@pages/Router";
// import { isEmpty } from "@util/utils";
// import { Component, createSignal } from "solid-js";

// type AddEntryProps = { orderId: string; link: (page: PageType) => void };

// export const AddEntry: Component<AddEntryProps> = (props) => {
//   const [eater, setEater] = createSignal("");
//   const [menuItem, setMenuItem] = createSignal("");
//   const [comment, setComment] = createSignal("");
//   const [activeValidation, setActiveValidation] = createSignal(false);

//   const formSubmit = (e: Event) => {
//     e.preventDefault();
//     setActiveValidation(true);
//     if (!isEmpty(eater()) && !isEmpty(menuItem())) {
//       saveNewEntry({
//         eater: eater(),
//         menuItem: menuItem(),
//         comment: comment(),
//         orderId: props.orderId,
//       }).catch((e) => {
//         console.error(e);
//         props.link("networkError");
//       });
//     }
//   };

//   return (
//     <div>
//       <h4 class="title is-4 has-text-centered">Weiteren Eintrag hinzufügen</h4>
//       <Form>
//         <Input
//           label="Besteller"
//           placeholder="Dein Name"
//           helpText="Damit wir wissen, wer diesen Eintrag erstellt hat und für das Essen bezahlt."
//           error={{
//             status: activeValidation() && isEmpty(eater()),
//             text: "Pflichtfeld",
//           }}
//           setter={setEater}
//         />
//         <Input
//           label="Menüeintrag"
//           placeholder="z.B. Pizza XY, Kebap Döner"
//           helpText="Bitte verwende den selben Namen, wie auf der Menüseite."
//           error={{
//             status: activeValidation() && isEmpty(menuItem()),
//             text: "Pflichtfeld",
//           }}
//           setter={setMenuItem}
//         />
//         <Input
//           label="Kommentar"
//           placeholder="z.B. Kleine Pizza, Jogurtsauce"
//           helpText="Es können nur Wünsche berücksichtig werden, die das Restaurant auch zulässt. Wenn du Infos weglässt (z.B. die Grösse der Pizza), gehen wir vom Standard aus."
//           setter={setComment}
//         />
//         <Button color="success" onClick={formSubmit}>
//           <IconLeft icon="check">Eintrag hinzufügen</IconLeft>
//         </Button>
//       </Form>
//     </div>
//   );
// };

export {};

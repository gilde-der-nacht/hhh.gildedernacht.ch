import { ParentComponent } from "solid-js";

export const Form: ParentComponent = (props) => {
  return <form action="">{props.children}</form>;
};

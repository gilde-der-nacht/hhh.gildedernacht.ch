import { Component, JSX } from "solid-js";

type FormProps = {
  children: JSX.Element;
};

export const Form: Component<FormProps> = (props) => {
  return <form action="">{props.children}</form>;
};

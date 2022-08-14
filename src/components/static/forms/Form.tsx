import type { Component, JSX } from "solid-js";

type FormProps = {
  children: JSX.Element;
};

export const Form: Component<FormProps> = ({ children }) => {
  return <form action="">{children}</form>;
};

import type { Component } from "solid-js";
import { PageType } from "./PageTypes";

type PageProps = {
  link: (page: PageType) => void;
};

export const NewLocationPage: Component<PageProps> = () => {
  return <h1>New Locatio</h1>;
};

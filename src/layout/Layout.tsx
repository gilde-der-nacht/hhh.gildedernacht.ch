import { Toast, ToastOptions } from "@components/static/Toast";
import { Footer } from "@layout/Footer";
import { Header } from "@layout/Header";
import { Navbar } from "@layout/Navbar";
import { PageType } from "@pages/util/Router";
import { ParentComponent, Setter } from "solid-js";

type Props = {
  toast: ToastOptions;
  setToast: Setter<ToastOptions>;
  link: (page: PageType) => void;
};

export const Layout: ParentComponent<Props> = (props) => {
  return (
    <div class="hhh-body">
      <Header link={props.link}></Header>
      <Navbar setPage={props.link}></Navbar>
      {props.children}
      <Footer></Footer>
      <Toast {...props.toast} setToast={props.setToast} />
    </div>
  );
};

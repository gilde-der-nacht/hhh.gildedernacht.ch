import { Toast, ToastOptions } from "@components/static/Toast";
import { Footer } from "@layout/Footer";
import { Header } from "@layout/Header";
import { Navbar } from "@layout/Navbar";
import { PageType } from "@pages/util/Router";
import { ParentComponent } from "solid-js";

type Props = {
  toast: ToastOptions;
  setToast: (o: ToastOptions) => void;
  hideToast: () => void;
  link: (page: PageType) => void;
};

export const Layout: ParentComponent<Props> = (props) => {
  return (
    <div class="hhh-body">
      <Header link={props.link}></Header>
      <Navbar link={props.link}></Navbar>
      {props.children}
      <Footer></Footer>
      <Toast
        {...props.toast}
        setToast={props.setToast}
        hideToast={props.hideToast}
      />
    </div>
  );
};

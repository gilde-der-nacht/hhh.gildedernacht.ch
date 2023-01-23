import { Toast } from "@components/static/Toast";
import { Footer } from "@layout/Footer";
import { Header } from "@layout/Header";
import { Navbar } from "@layout/Navbar";
import { AppState } from "@util/StateTypes";
import { hideToast, link, setToast } from "@util/utils";
import { Accessor, JSX, Setter } from "solid-js";

type Props = {
  stateSignal: [Accessor<AppState>, Setter<AppState>];
  children: JSX.Element;
};

export const Layout = (props: Props): JSX.Element => {
  const [state, setState] = props.stateSignal;

  return (
    <div class="hhh-body">
      <Header link={link(setState)}></Header>
      <Navbar link={link(setState)}></Navbar>
      {props.children}
      <Footer></Footer>
      <Toast
        {...state().toast}
        setToast={setToast(setState)}
        hideToast={hideToast(setState)}
      />
    </div>
  );
};

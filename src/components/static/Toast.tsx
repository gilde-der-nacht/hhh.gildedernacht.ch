import { IconLeft, IconType } from "@components/static/icons/Icon";
import {
  Notification,
  NotificationKind,
} from "@components/static/Notification";
import { isPromise } from "@util/utils";
import { Component, createEffect, mergeProps, Setter } from "solid-js";

export type ToastOptions = {
  isVisible?: boolean;
  kind?: NotificationKind | "loading";
  text?: string;
  waitFor?:
    | {
        promise: Promise<any>;
        onSuccessMessage: string;
        onErrorMessage: string;
      }
    | number;
};

export const Toast: Component<
  ToastOptions & { setToast: Setter<ToastOptions> }
> = (props) => {
  const merged = mergeProps({ isVisible: false, waitFor: 5_000 }, props);

  createEffect(() => {
    if (!merged.isVisible) {
      return;
    }
    if (typeof merged.waitFor === "number") {
      setTimeout(
        () => merged.setToast((prev) => ({ ...prev, visible: false })),
        merged.waitFor
      );
    } else if (merged.waitFor && isPromise(merged.waitFor?.promise)) {
      const { promise, onSuccessMessage, onErrorMessage } = merged.waitFor;
      promise
        .then(() =>
          merged.setToast({
            visible: true,
            text: onSuccessMessage,
            kind: "success",
            waitFor: 5_000,
          })
        )
        .catch(() =>
          merged.setToast({
            visible: true,
            text: onErrorMessage,
            kind: "danger",
            waitFor: 10_000,
          })
        );
    }
  });

  const iconName = (): IconType => {
    switch (merged.kind) {
      case "loading":
        return "spinner-third";
      case "danger":
        return "square-exclamation";
      case "success":
        return "square-check";
      default:
        return "square-info";
    }
  };

  return (
    <div class="hhh-toast" classList={{ hide: !merged.isVisible }}>
      <div class="container">
        <Notification
          kind={merged.kind === "loading" ? "info" : merged.kind}
          isLight={false}
        >
          <IconLeft icon={iconName()}>{merged.text}</IconLeft>
        </Notification>
      </div>
    </div>
  );
};

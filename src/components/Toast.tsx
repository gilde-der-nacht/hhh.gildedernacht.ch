import { IconType } from "@components/static/icons/Icon";
import { IconLeft } from "@components/static/icons/IconLeft";
import {
  Notification,
  NotificationType
} from "@components/static/Notification";
import { isPromise } from "@util/utils";
import { Component, createEffect, mergeProps, Setter } from "solid-js";

export type ToastOptions = {
  visible?: boolean;
  type?: NotificationType | "loading";
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
  const merged = mergeProps({ visible: false }, props);

  createEffect(() => {
    if (!merged.visible) {
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
            type: "success",
            waitFor: 5_000,
          })
        )
        .catch(() =>
          merged.setToast({
            visible: true,
            text: onErrorMessage,
            type: "danger",
            waitFor: 10_000,
          })
        );
    }
  });

  const iconName = (): IconType => {
    switch (merged.type) {
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
    <div classList={{ "hhh-toast": true, hide: !merged.visible }}>
      <div class="container">
        <Notification
          type={merged.type === "loading" ? "info" : merged.type}
          isLight={false}
        >
          <IconLeft icon={iconName()}>{merged.text}</IconLeft>
        </Notification>
      </div>
    </div>
  );
};

import { IconType } from "@components/static/icons/Icon";
import { IconLeft } from "@components/static/icons/IconLeft";
import {
  Notification,
  NotificationType,
} from "@components/static/Notification";
import { isPromise } from "@util/utils";
import { Component, createEffect, mergeProps } from "solid-js";

export type ToastOptions = {
  visible?: boolean;
  type?: NotificationType | "loading";
  text?: string;
  waitFor?: Promise<any> | number;
};

export const Toast: Component<ToastOptions & { hideToast: () => void }> = (
  props
) => {
  const merged = mergeProps({ visible: false }, props);

  createEffect(() => {
    if (!merged.visible) {
      return;
    }
    if (typeof merged.waitFor === "number") {
      setTimeout(() => merged.hideToast(), merged.waitFor);
    } else if (isPromise(merged.waitFor)) {
      merged.waitFor.then(() => merged.hideToast());
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

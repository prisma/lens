import React, { Children, createContext, useContext, useRef } from "react";
import cn from "classnames";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { PressResponder } from "@react-aria/interactions";
import {
  DismissButton,
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import {
  OverlayTriggerState,
  useOverlayTriggerState,
} from "@react-stately/overlays";
import { TitleGroup } from "../title-group/TitleGroup";

type DialogContext = {
  close: OverlayTriggerState["close"];
  title: string;
  subtitle: string;
  icon: string;
  footer?: React.ReactElement;
};
// @ts-expect-error: Because we cannot supply a valid value at initialization
const DialogContext = createContext<DialogContext>(null);

type DialogContainerProps = {
  /** The dialog's trigger and its body, in order */
  children:
    | [React.ReactElement, React.ReactElement]
    | [React.ReactElement, React.ReactElement, React.ReactElement];
  /** Title of the dialog */
  title: string;
  /** A short description about what this dialog accomplishes. */
  subtitle: string;
  /** A decorative icon */
  icon: string;
  /** Controls if this dialog is open by default (when mounted) */
  defaultOpen?: boolean;
};

function DialogContainer({
  children,
  title,
  subtitle,
  icon,
  defaultOpen,
}: DialogContainerProps) {
  if (!Array.isArray(children)) {
    throw new Error("A Dialog.Container must receive an array of children");
  }
  if (children.length < 2 || children.length > 3) {
    throw new Error(
      "A Dialog.Container must have exactly two or three children"
    );
  }

  const [trigger, content, footer] = children;

  const state = useOverlayTriggerState({
    defaultOpen,
  });

  return (
    <DialogContext.Provider
      value={{
        close: state.close,
        title,
        subtitle,
        icon,
        footer,
      }}
    >
      <PressResponder isPressed={state.isOpen} onPress={state.toggle}>
        {trigger}
      </PressResponder>
      {state.isOpen && content}
    </DialogContext.Provider>
  );
}

/** The Dialog's Content when opened */
type DialogContentProps = {
  children: (close: () => void) => React.ReactElement;
  /** Controls if this dialog should close when it goes out of focus */
  shouldCloseOnBlur?: boolean;
};

function DialogContent({
  children,
  shouldCloseOnBlur = true,
}: DialogContentProps) {
  const { close, title, subtitle, icon, footer } = useContext(DialogContext);

  const overlayRef = useRef<HTMLDivElement>(null);
  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      shouldCloseOnBlur: shouldCloseOnBlur,
      onClose: close,
    },
    overlayRef
  );

  usePreventScroll();
  const { modalProps } = useModal();

  const { dialogProps, titleProps } = useDialog(
    {
      role: "dialog",
    },
    overlayRef
  );

  return (
    <OverlayContainer>
      <div
        className={cn(
          "flex justify-center items-center",
          "fixed top-0 bottom-0 left-0 right-0 z-30",
          "bg-black-fade-50"
        )}
      >
        <FocusScope contain autoFocus restoreFocus>
          <>
            <DismissButton onDismiss={close} />
            <div
              ref={overlayRef}
              {...mergeProps(overlayProps, dialogProps, modalProps)}
              className={cn(
                "left-0 right-0 w-full",
                "rounded-md shadow-md overflow-hidden",
                "bg-gray-100 dark:bg-gray-800",
                "animate-dialog-enter"
              )}
              style={{ width: 580 }}
            >
              <TitleGroup
                title={title}
                subtitle={subtitle}
                icon={icon}
                titleProps={titleProps}
                className={cn(
                  "px-6 py-4",
                  "bg-white dark:bg-gray-900",
                  "border-b border-gray-300 dark:border-gray-600"
                )}
              />
              <section
                className={cn(
                  "px-6 py-4",
                  "border-b border-gray-300 dark:border-gray-600"
                )}
              >
                {children(close)}
              </section>
              {footer}
            </div>
            <DismissButton onDismiss={close} />
          </>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
}

type DialogFooterProps = {
  children: React.ReactElement;
};

function DialogFooter({ children }: DialogFooterProps) {
  return <div className="px-3 py-2">{children}</div>;
}

export const Dialog = {
  Container: DialogContainer,
  Content: DialogContent,
  Footer: DialogFooter,
};

import React, { ReactElement } from "react";
import { FocusRing as AriaFocusRing } from "@react-aria/focus";

type FocusRingProps = {
  /** Controls if the child receives focus when first rendered */
  autoFocus?: boolean;
  /** Element to draw the FocusRing around */
  children: ReactElement<any>;
};

export function FocusRing({ children, autoFocus }: FocusRingProps) {
  return (
    <AriaFocusRing
      autoFocus={autoFocus}
      focusRingClass="ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-blue-400"
    >
      {children}
    </AriaFocusRing>
  );
}

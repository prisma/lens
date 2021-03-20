import React, { ReactElement } from "react"
import {
  FocusRing as AriaFocusRing,
  FocusRingProps as AriaFocusRingProps,
} from "@react-aria/focus"

export type FocusRingProps = AriaFocusRingProps & {
  /** Element to draw the FocusRing around */
  children: ReactElement<any>
}

export function FocusRing({ children, ...props }: FocusRingProps) {
  return (
    <AriaFocusRing
      {...props}
      focusRingClass="ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-blue-400"
    >
      {children}
    </AriaFocusRing>
  )
}

import React, { forwardRef, useRef } from "react"
import cn from "classnames"
import { useButton } from "@react-aria/button"
import { useHover } from "@react-aria/interactions"
import { mergeProps } from "@react-aria/utils"
import { FocusRing } from "../focus-ring/FocusRing"

export type ButtonProps = React.PropsWithChildren<{
  /** A React ref to attach to the rendered Button */
  ref?: React.ForwardedRef<HTMLButtonElement>
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls what kind of button this is */
  variant?: "primary" | "negative" | "secondary" | "quiet" | "link"
  /** Controls if this button should steal focus when mounted */
  autoFocus?: boolean
  /** Controls if this button is disabled */
  isDisabled?: boolean
  /** Controls if the button will grow to fill its parent */
  fillParent?: boolean
  /** Icon element placed before the children. */
  startIcon?: React.ReactNode | null
  /** Icon element placed after the children. */
  endIcon?: React.ReactNode | null
  /** Callback invoked when this button is pressed */
  onPress?: () => void
}>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      id,
      autoFocus = false,
      variant = "primary",
      isDisabled = false,
      fillParent = false,
      startIcon = null,
      endIcon = null,
      children,
      onPress,
    }: ButtonProps,
    forwardedRef
  ) => {
    const _ref = useRef<HTMLButtonElement>(null)
    const ref = forwardedRef || _ref
    const { buttonProps, isPressed } = useButton(
      { id, isDisabled, autoFocus, onPress },
      ref as React.RefObject<HTMLButtonElement>
    )
    const { hoverProps, isHovered } = useHover({ isDisabled })

    return (
      <FocusRing autoFocus={autoFocus}>
        <button
          id={id}
          lens-role="button"
          ref={ref}
          {...mergeProps(hoverProps, buttonProps)}
          className={cn(
            "flex justify-center items-center px-3 py-1.5",
            "rounded-md",
            "text-sm whitespace-nowrap",
            {
              "cursor-not-allowed": isDisabled,
              "flex-grow": fillParent,
            },
            {
              "font-semibold bg-gray-700 text-white": variant === "primary",
              "font-semibold bg-gray-500 text-white":
                variant === "primary" && isDisabled,
              "bg-gray-800": variant === "primary" && isHovered,
              "bg-gray-900": variant === "primary" && isPressed,
            },
            {
              "font-semibold bg-red-600 text-white": variant === "negative",
              "font-semibold bg-red-300 text-white":
                variant === "negative" && isDisabled,
              "bg-red-700": variant === "negative" && isHovered,
              "bg-red-800": variant === "negative" && isPressed,
            },
            {
              "font-semibold bg-gray-200 text-gray-800":
                variant === "secondary",
              "font-semibold text-gray-500":
                variant === "secondary" && isDisabled,
              "bg-gray-300": variant === "secondary" && isHovered,
              "bg-gray-400": variant === "secondary" && isPressed,
            },
            {
              "text-gray-800 dark:text-gray-100": variant === "quiet",
              "text-gray-400 dark:text-gray-500":
                variant === "quiet" && isDisabled,
              "text-gray-500": variant === "quiet" && isPressed,
            },
            {
              "underline text-gray-600 dark:text-gray-400": variant === "link",
              "text-gray-400 dark:text-gray-600":
                variant === "link" && isDisabled,
              "text-gray-700 dark:text-gray-500":
                variant === "link" && isHovered,
              "text-gray-800 dark:text-gray-600":
                variant === "link" && isPressed,
            }
          )}
        >
          {startIcon && (
            <span className="mr-1">{startIcon}</span>
          )}
          {children}
          {endIcon && (
            <span className="ml-1">{endIcon}</span>
          )}
        </button>
      </FocusRing>
    )
  }
)

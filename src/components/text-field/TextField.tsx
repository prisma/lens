import React, { useRef, forwardRef } from "react"
import cn from "classnames"
import { useTextField } from "@react-aria/textfield"
import { useFocusWithin, useHover } from "@react-aria/interactions"
import { Label } from "../label/Label"
import { FocusRing } from "../focus-ring/FocusRing"
import { Icon } from "../icon/Icon"
import { Tooltip } from "../tooltip/Tooltip"
import { useFocusable } from "@react-aria/focus"
import { mergeProps } from "@react-aria/utils"

export type TextFieldProps = {
  /** A React ref to attach to the rendered Button */
  ref?: React.ForwardedRef<HTMLInputElement>
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this TextField should steal focus when mounted */
  autoFocus?: boolean
  /** Initial value to populate the TextField with */
  defaultValue?: string
  /** An optional error to show below the TextField */
  error?: string
  /** Hints at the type of data that might be entered into this TextField */
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "decimal"
  /** Controls if this TextField is disabled */
  isDisabled?: boolean
  /** Controls if this TextField is readonly */
  isReadOnly?: boolean
  /** A label that identifies this TextField's purpose */
  label?: string
  /** Name of the value held by this TextField when placed inside a form */
  name?: string
  /** Callback fired when the value of this TextField changes */
  onChange?: (value: string) => void
  /** A value to display in the TextField when it is empty */
  placeholder?: string
  /** A fixed value that is appended to the beginning of the TextField */
  prefix?: string
  /** The type of input to render */
  type?: "text" | "email" | "tel" | "url" | "numeric" | "decimal"
  /** The value of the TextField */
  value?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      autoFocus = false,
      defaultValue,
      error,
      inputMode,
      isDisabled = false,
      isReadOnly = false,
      label,
      name,
      onChange,
      placeholder,
      prefix,
      type = "text",
      value,
    }: TextFieldProps,
    forwardedRef
  ) => {
    const _inputRef = useRef<HTMLInputElement>(null)
    const inputRef = forwardedRef || _inputRef
    const { labelProps, inputProps } = useTextField(
      {
        id,
        autoFocus,
        defaultValue,
        inputMode,
        isDisabled,
        isReadOnly,
        label,
        name,
        onChange,
        placeholder,
        type,
        value,
        validationState: error ? "invalid" : undefined,
      },
      inputRef as React.RefObject<HTMLInputElement>
    )

    const { focusWithinProps } = useFocusWithin({
      isDisabled,
    })

    const isInvalid = !!inputProps["aria-invalid"]

    return (
      <div className={cn("table-row w-full")}>
        {label && <Label labelProps={labelProps}>{label}</Label>}
        <FocusRing autoFocus={autoFocus} within>
          <section className="table-cell w-full">
            <div
              {...focusWithinProps}
              className={cn(
                "flex flex-grow",
                "rounded-md shadow-sm border border-gray-300 dark:border-gray-700",
                "text-sm",
                "overflow-hidden",
                {
                  "pr-1.5": prefix,
                  "bg-gray-100 dark:bg-gray-800": isDisabled,
                  "bg-white dark:bg-gray-900": !isDisabled,
                  "cursor-not-allowed": isDisabled,
                  "border-2 border-red-500 dark:border-red-500": isInvalid,
                }
              )}
            >
              {prefix && (
                <div
                  className={cn(
                    "py-1.5 px-3",
                    "bg-gray-200 dark:bg-gray-700",
                    "text-gray-800 dark:text-gray-400 font-medium",
                    "select-none"
                  )}
                >
                  {prefix}
                </div>
              )}
              <input
                ref={inputRef}
                lens-role="text-field"
                {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
                className={cn("flex-grow input", "px-3 py-1.5", {
                  disabled: isDisabled,
                })}
                required
              />

              <ErrorIcon text={error} visible={isInvalid} />
            </div>
          </section>
        </FocusRing>
      </div>
    )
  }
)

type ErrorIconProps = {
  /** Controls if the error icon should show */
  visible: boolean
  /** The error text */
  text?: string
}

function ErrorIcon({
  text = "This field is invalid",
  visible,
}: ErrorIconProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { focusableProps } = useFocusable({ excludeFromTabOrder: false }, ref)
  const { hoverProps, isHovered } = useHover({})

  if (!visible) {
    return null
  }

  return (
    <>
      <div
        ref={ref as any}
        className="p-2"
        {...mergeProps(focusableProps, hoverProps)}
      >
        <Icon
          name="alert-circle"
          className="text-red-500 dark:text-red-500"
          size="sm"
        />
      </div>
      {isHovered && (
        <Tooltip target={ref} position="right">
          {text}
        </Tooltip>
      )}
    </>
  )
}

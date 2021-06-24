import React, { useRef, forwardRef, useState } from "react"
import cn from "classnames"
import { useTextField } from "@react-aria/textfield"
import { useFocus, useFocusWithin } from "@react-aria/interactions"
import { Label } from "../label/Label"
import { FocusRing } from "../focus-ring/FocusRing"
import { Icon } from "../icon/Icon"
import { chain, mergeProps } from "@react-aria/utils"

export type TextFieldProps = {
  /** A React ref to attach to the rendered Button */
  ref?: React.ForwardedRef<HTMLInputElement>
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this TextField should steal focus when mounted */
  autoFocus?: boolean
  /** Initial value to populate the TextField with */
  defaultValue?: string
  /** An optional error to show next to the TextField. If a `validator` is also supplied, the `validator` takes precendence */
  errorText?: string
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
  /** An custom function that runs for every change to validate the value. Return `undefined` if the value is valid, and a string describing the error otherwise */
  validator?: (v: string) => string | undefined
  /** The value of the TextField */
  value: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      autoFocus = false,
      defaultValue,
      errorText: _errorText,
      inputMode,
      isDisabled = false,
      isReadOnly = false,
      label,
      name,
      onChange,
      placeholder,
      prefix,
      type = "text",
      validator,
      value,
    }: TextFieldProps,
    forwardedRef
  ) => {
    const _inputRef = useRef<HTMLInputElement>(null)
    const inputRef = forwardedRef || _inputRef

    const [invalidText, setInvalidText] = useState<string | undefined>()
    const { focusProps } = useFocus({
      onBlur: () => {
        // Validation is disabled until the user touches / focuses the field at least once
        setInvalidText(validator?.(value || ""))
      },
    })

    // We want to make it so that if an `errorText` is supplied, it will always show up, even if `isValidatorEnabled` is false
    const errorText = invalidText || _errorText
    // console.log({ isValidatorEnabled, errorText, invalidText })

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
        onChange: chain(onChange, (v: string) => {
          setInvalidText(validator?.(v) || undefined)
        }),
        placeholder,
        type,
        value,
        validationState: !!errorText ? "invalid" : undefined,
      },
      inputRef as React.RefObject<HTMLInputElement>
    )

    const { focusWithinProps } = useFocusWithin({
      isDisabled,
    })

    return (
      <div className={cn("table-row w-full")}>
        {label && <Label labelProps={labelProps}>{label}</Label>}
        <section className="table-cell w-full">
          <FocusRing autoFocus={autoFocus} within>
            <div
              {...focusWithinProps}
              className={cn(
                "flex flex-grow items-center",
                "rounded-md shadow-sm border border-gray-300 dark:border-gray-700",
                "text-sm",
                "overflow-hidden",
                {
                  "bg-gray-100 dark:bg-gray-800": isDisabled,
                  "bg-white dark:bg-gray-900": !isDisabled,
                  "cursor-not-allowed": isDisabled,
                  "border-2 border-red-500 dark:border-red-500": !!errorText,
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
                {...(mergeProps(
                  focusProps,
                  inputProps
                ) as React.InputHTMLAttributes<HTMLInputElement>)}
                className={cn("flex-grow input", "px-3 py-1.5", {
                  disabled: isDisabled,
                })}
                required
              />

              {!!errorText && (
                <Icon
                  name="alert-circle"
                  className={cn("m-2", "text-red-500 dark:text-red-500")}
                  size="sm"
                />
              )}
            </div>
          </FocusRing>

          <ErrorText text={errorText} />
        </section>
      </div>
    )
  }
)

type ErrorTextProps = {
  /** The error text */
  text?: string
}

function ErrorText({ text }: ErrorTextProps) {
  if (!text) {
    return null
  }

  return (
    <div
      className={cn(
        "mt-2",
        "text-sm text-red-500 dark:text-red-500",
        "animate-slide-top"
      )}
    >
      {text}
    </div>
  )
}

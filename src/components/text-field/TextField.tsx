import React, { useRef, forwardRef, useState } from "react"
import cn from "classnames"
import { useTextField } from "@react-aria/textfield"
import { useFocus, useFocusWithin, useHover } from "@react-aria/interactions"
import { Label } from "../label/Label"
import { FocusRing } from "../focus-ring/FocusRing"
import { Icon } from "../icon/Icon"
import { Tooltip } from "../tooltip/Tooltip"
import { useFocusable } from "@react-aria/focus"
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
  /** An optional error to show next to the TextField */
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
  value?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      autoFocus = false,
      defaultValue,
      errorText,
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

    const [isValidationEnabled, setIsValidationEnabled] = useState(false)
    const { focusProps } = useFocus({
      onBlur: () => {
        // Validation is disabled until the user touches / focuses the field at least once
        setIsValidationEnabled(true)
        setInvalidText(validator?.(value || "") || errorText)
      },
    })

    const [invalidText, setInvalidText] = useState<string | undefined>(
      errorText || undefined
    ) // If there's no validator, then the presence of `errorText` controls `invalid`
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
          isValidationEnabled
            ? setInvalidText(validator?.(v) || errorText)
            : setInvalidText(undefined)
        }),
        placeholder,
        type,
        value,
        validationState: !!invalidText ? "invalid" : undefined,
      },
      inputRef as React.RefObject<HTMLInputElement>
    )

    const { focusWithinProps } = useFocusWithin({
      isDisabled,
    })

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
                  "border-2 border-red-500 dark:border-red-500": !!invalidText,
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

              <ErrorIcon text={invalidText} />
            </div>
          </section>
        </FocusRing>
      </div>
    )
  }
)

type ErrorIconProps = {
  /** The error text */
  text?: string
}

function ErrorIcon({ text }: ErrorIconProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { focusableProps } = useFocusable({ excludeFromTabOrder: false }, ref)
  const { hoverProps, isHovered } = useHover({})

  if (!text) {
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
          name="x-circle"
          className="text-red-500 dark:text-red-500"
          size="sm"
        />
      </div>
      {isHovered && (
        <Tooltip target={ref} position="top">
          {text}
        </Tooltip>
      )}
    </>
  )
}

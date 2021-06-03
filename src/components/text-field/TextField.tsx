import React, { useRef, forwardRef } from "react"
import cn from "classnames"
import { useTextField } from "@react-aria/textfield"
import { useFocusWithin } from "@react-aria/interactions"
import { mergeProps } from "@react-aria/utils"
import { Label } from "../label/Label"
import { FocusRing } from "../focus-ring/FocusRing"

export type TextFieldProps = React.PropsWithChildren<{
  /** A React ref to attach to the rendered Button */
  ref?: React.ForwardedRef<HTMLInputElement>
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this TextField should steal focus when mounted */
  autoFocus?: boolean
  /** Initial value to populate the TextField with */
  defaultValue?: string
  /** Hints at the type of data that might be entered into this TextField */
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "decimal"
  /** Additional props to spread over the input component */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
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
}>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      autoFocus = false,
      children,
      defaultValue,
      inputMode,
      inputProps = {},
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
    const { labelProps, inputProps: textFieldInputProps } = useTextField(
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
      },
      inputRef as React.RefObject<HTMLInputElement>
    )

    const { focusWithinProps } = useFocusWithin({
      isDisabled,
      // onFocusWithin: () => inputRef.current?.focus(),
    })

    return (
      <div className={cn("table-row w-full")}>
        {label && <Label labelProps={labelProps}>{label}</Label>}
        <FocusRing autoFocus={autoFocus} within>
          <section className="table-cell w-full">
            <div
              tabIndex={0}
              {...focusWithinProps}
              className={cn(
                "flex flex-grow",
                "rounded-md shadow-sm border border-gray-300 dark:border-gray-700",
                "text-sm",
                {
                  "px-3 py-1.5": !prefix,
                  "pr-1.5": prefix,
                  "bg-gray-100 dark:bg-gray-800": isDisabled,
                  "bg-white dark:bg-gray-900": !isDisabled,
                  "cursor-not-allowed": isDisabled,
                }
              )}
            >
              {prefix && (
                <div
                  className={cn(
                    "mr-3 py-1.5 px-3",
                    "bg-gray-200 dark:text-gray-800 font-medium",
                    "select-none"
                  )}
                >
                  {prefix}
                </div>
              )}
              <input
                ref={inputRef}
                lens-role="text-field"
                {...mergeProps(
                  inputProps,
                  textFieldInputProps as React.InputHTMLAttributes<HTMLInputElement>
                )}
                className={cn("flex-grow", {
                  input: true,
                  disabled: isDisabled,
                })}
              />
              {children}
            </div>
          </section>
        </FocusRing>
      </div>
    )
  }
)

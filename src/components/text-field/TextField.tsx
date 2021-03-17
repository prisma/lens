import React, {
  Ref,
  RefObject,
  ReactElement,
  useRef,
  forwardRef,
  PropsWithChildren,
  useState,
} from "react";
import cn from "classnames";
import { useTextField } from "@react-aria/textfield";
import { useFocusWithin } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { Label } from "../label/Label";
import { FocusRing } from "../focus-ring/FocusRing";

type TextFieldProps = PropsWithChildren<{
  /** Controls if this TextField should steal focus when mounted */
  autoFocus?: boolean;
  /** Initial value to populate the TextField with */
  defaultValue?: string;
  /** A ID that will be attached to the rendered TextField. Useful when targeting the TextField from tests */
  id?: string;
  /** Hints at the type of data that might be entered into this TextField */
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "decimal";
  /** Additional props to spread over the input component */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Controls if this TextField is disabled */
  isDisabled?: boolean;
  /** Controls if this TextField is readonly */
  isReadOnly?: boolean;
  /** A label that identifies this TextField's purpose */
  label?: string;
  /** Name of the value held by this TextField when placed inside a form */
  name?: string;
  /** Callback fired when the value of this TextField changes */
  onChange?: (value: string) => void;
  /** A value to display in the TextField when it is empty */
  placeholder?: string;
  /** A fixed value that is appended to the beginning of the TextField */
  prefix?: string;
  /** The type of input to render */
  type?: "text" | "email" | "tel" | "url" | "numeric" | "decimal";
  /** The value of the TextField */
  value?: string;
}>;

function TextField(
  {
    autoFocus = false,
    children,
    defaultValue,
    id,
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
  forwardedRef: Ref<HTMLInputElement>
) {
  const _inputRef = useRef<HTMLInputElement>(null);
  const inputRef = (forwardedRef || _inputRef) as RefObject<HTMLInputElement>;
  const { labelProps, inputProps: textFieldInputProps } = useTextField(
    {
      autoFocus,
      defaultValue,
      id,
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
    inputRef
  );

  const [isFocused, setFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    isDisabled,
    onFocusWithinChange: isFocusWithin => {
      isFocusWithin && inputRef.current?.focus();
      setFocused(isFocusWithin);
    },
  });

  return (
    <div className={cn("table-row items-center")}>
      {label && <Label label={label} labelProps={labelProps} />}
      <FocusRing autoFocus={autoFocus}>
        <section
          tabIndex={0}
          {...focusWithinProps}
          className={cn(
            "flex-grow table-cell",
            "rounded-md shadow-sm border border-gray-300 dark:border-gray-700",
            "px-3 py-1.5",
            "text-sm",
            {
              "bg-gray-100 dark:bg-gray-800": isDisabled,
              "bg-white dark:bg-gray-900": !isDisabled,
              "cursor-not-allowed": isDisabled,
              "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-blue-400": isFocused,
            }
          )}
        >
          <div
            tabIndex={0}
            className={cn(
              "mr-1",
              "text-gray-300 dark:text-gray-500",
              "select-none"
            )}
          >
            {prefix}
          </div>
          <input
            ref={inputRef}
            {...mergeProps(
              inputProps,
              textFieldInputProps as React.InputHTMLAttributes<HTMLInputElement>
            )}
            className={cn("flex-grow", {
              "bg-white dark:bg-gray-900": !isDisabled,
              "bg-gray-100 dark:bg-gray-800": isDisabled,
              "text-gray-900 dark:text-gray-100": !isDisabled,
              "text-gray-400 dark:text-gray-400": isDisabled,
              "cursor-not-allowed": isDisabled,
            })}
          />
          {children}
        </section>
      </FocusRing>
    </div>
  );
}

const _TextField = forwardRef(TextField) as (
  props: TextFieldProps & { ref?: Ref<HTMLInputElement> }
) => ReactElement;
export { _TextField as TextField };

import React, {
  Ref,
  RefObject,
  ReactElement,
  useRef,
  forwardRef,
  PropsWithChildren,
} from "react";
import cn from "classnames";
import { useTextField } from "@react-aria/textfield";
import { mergeProps } from "@react-aria/utils";
import { Label } from "../label/Label";

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
  const _ref = useRef<HTMLInputElement>(null);
  const ref = (forwardedRef || _ref) as RefObject<HTMLInputElement>;
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
    ref
  );

  return (
    <div className={cn("flex items-center")}>
      {label && <Label label={label} labelProps={labelProps} />}
      <section
        className={cn(
          "flex-grow",
          "rounded-md shadow-sm border border-gray-300",
          "px-3 py-1.5",
          "text-sm"
        )}
      >
        <span className={cn("text-gray-300")}>{prefix}</span>
        <input
          ref={ref}
          {...mergeProps(
            inputProps,
            textFieldInputProps as React.InputHTMLAttributes<HTMLInputElement>
          )}
          className={cn("flex-grow", "text-gray-600")}
        />
        {children}
      </section>
    </div>
  );
}

const _TextField = forwardRef(TextField) as (
  props: TextFieldProps & { ref?: Ref<HTMLInputElement> }
) => ReactElement;
export { _TextField as TextField };

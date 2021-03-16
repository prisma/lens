import React from "react";
import cn from "classnames";

type LabelProps = {
  /** The content of this label */
  label: string;
  /** Additional props to spread over the label component */
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
};

export function Label({ label, labelProps }: LabelProps) {
  return (
    <label
      {...labelProps}
      className={cn(
        "ml-4 mr-8",
        "text-sm font-semibold text-gray-900 dark:text-gray-100"
      )}
    >
      {label}
    </label>
  );
}

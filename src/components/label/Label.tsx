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
        "table-cell align-middle pr-8",
        "whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100"
      )}
    >
      {label}
    </label>
  );
}

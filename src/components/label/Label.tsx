import React from "react"
import cn from "classnames"

export type LabelProps = {
  /** The content of this label */
  children: string
  /** Additional props to spread over the label component */
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
}

export function Label({ children, labelProps }: LabelProps) {
  return (
    <label
      {...labelProps}
      className={cn(
        "table-cell align-middle pr-8",
        "whitespace-nowrap text-sm font-semibold text-gray-800 dark:text-gray-100"
      )}
    >
      {children}
    </label>
  )
}

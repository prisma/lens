import React from "react"
import cn from "classnames"

export type LabelProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** The content of this label */
  children: string
  /** Additional props to spread over the label component */
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
}

export function Label({ id, children, labelProps }: LabelProps) {
  return (
    <label
      {...labelProps}
      id={id}
      lens-role="label"
      className={cn(
        "table-cell pr-8",
        "whitespace-nowrap text-sm font-semibold text-gray-800 dark:text-gray-100"
      )}
    >
      {children}
    </label>
  )
}

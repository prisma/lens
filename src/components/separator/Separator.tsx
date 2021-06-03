import React from "react"
import cn from "classnames"
import { useSeparator } from "@react-aria/separator"

export type SeparatorProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** This Separator's orientation */
  orientation?: "vertical" | "horizontal"
}

export function Separator({ id, orientation = "horizontal" }: SeparatorProps) {
  const { separatorProps } = useSeparator({
    id,
    orientation,
  })

  return (
    <div
      lens-role="separator"
      {...separatorProps}
      className={cn("border-gray-300 dark:border-gray-700", {
        "border-b my-2": orientation === "horizontal",
        "border-r": orientation === "vertical",
      })}
    />
  )
}

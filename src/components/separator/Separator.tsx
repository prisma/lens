import React from "react"
import cn from "classnames"
import { useSeparator } from "@react-aria/separator"

export type SeparatorProps = {
  /** This Separator's orientation */
  orientation?: "vertical" | "horizontal"
}

export function Separator({ orientation = "horizontal" }: SeparatorProps) {
  const { separatorProps } = useSeparator({
    orientation,
  })

  return (
    <div
      {...separatorProps}
      className={cn("border-gray-400 dark:border-gray-700", {
        "border-b my-2": orientation === "horizontal",
        "border-r": orientation === "vertical",
      })}
    />
  )
}

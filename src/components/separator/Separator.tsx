import React from "react"
import cn from "classnames"
import { useSeparator } from "@react-aria/separator"

export type SeparatorProps = {
  orientation?: "vertical" | "horizontal"
}

export function Separator({ orientation = "horizontal" }: SeparatorProps) {
  const { separatorProps } = useSeparator({
    orientation,
  })

  if (orientation === "horizontal") {
    return (
      <div
        {...separatorProps}
        className={cn("border-b my-2", "border-gray-300 dark:border-gray-700")}
      />
    )
  } else {
    return (
      <div
        {...separatorProps}
        className="border-r border-color-gray-300 dark:border-gray-700"
      />
    )
  }
}

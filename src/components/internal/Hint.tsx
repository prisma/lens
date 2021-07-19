import React from "react"
import cn from "classnames"

type HintProps = {
  id: string
  text?: string
  errorText?: string
}

export function Hint({ id, text, errorText }: HintProps) {
  if (!text && !errorText) {
    return null
  }

  return (
    <div
      id={id}
      className={cn(
        "mt-2",
        "text-sm",
        {
          "text-red-500 dark:text-red-500": !!errorText,
          "text-gray-600 dark:text-gray-400": !!text,
        },
        "animate-slide-top"
      )}
    >
      {errorText || text}
    </div>
  )
}

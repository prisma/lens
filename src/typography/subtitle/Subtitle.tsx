import React from "react"
import cn from "classnames"

export type SubtitleProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Content of the Subtitle */
  children: string
  /** Additional classes that will be forwarded to the Subtitle. Avoid classes that change the Subtitle's visuals. */
  className?: string
}

export function Subtitle({ id, children, className }: SubtitleProps) {
  return (
    <div
      id={id}
      lens-role="subtitle"
      className={cn("font-light text-sm text-gray-600", className)}
    >
      {children}
    </div>
  )
}

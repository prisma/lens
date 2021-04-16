import React from "react"
import cn from "classnames"

export type TitleProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Content of the Title */
  children: string
  /** Additional classes that will be forwarded to the Title. Avoid classes that change the Title's visuals. */
  className?: string
  /** Additionl props that will be spread over the title */
  titleProps?: React.HTMLAttributes<HTMLElement>
}

export function Title({ id, children, className, titleProps }: TitleProps) {
  return (
    <div
      id={id}
      lens-role="title"
      className={cn(
        "whitespace-nowrap font-barlow font-light text-xl text-gray-800 dark:text-gray-100",
        className
      )}
      {...titleProps}
    >
      {children}
    </div>
  )
}

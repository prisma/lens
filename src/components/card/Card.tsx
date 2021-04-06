import React from "react"
import cn from "classnames"
import { Icon } from "../icon/Icon"
import { Title } from "../../typography/title/Title"

export type CardProps = React.PropsWithChildren<{
  /** An identifying icon */
  icon?: string
  /** The title of the Card */
  title?: string
  /** If provided, fixes the Card's width */
  width?: number
  /** If provided, fixes the Card's width */
  height?: number
  /** Additional classes that will be attached to the Card. This is provided for layouting purposes. Avoid using classes that modify the card visually. */
  className?: string
}>

export function Card({
  children,
  icon,
  title,
  width,
  height,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 w-full",
        "rounded-lg shadow-md overflow-hidden",
        "bg-white dark:bg-gray-800",
        className
      )}
      style={{ width, height }}
    >
      {(icon || title) && (
        <section className="flex items-center">
          {icon && <Icon name={icon} size="md" className="mr-6"></Icon>}
          {title && <Title>{title}</Title>}
        </section>
      )}
      <section>{children}</section>
    </div>
  )
}

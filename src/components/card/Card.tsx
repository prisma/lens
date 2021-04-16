import React from "react"
import cn from "classnames"
import { Icon } from "../icon/Icon"
import { Title } from "../../typography/title/Title"
import { Button, ButtonProps } from "../button/Button"

export type CardProps = React.PropsWithChildren<{
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
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
  /** An optional action to be displayed next to the title */
  action?: { title: string; onPress: ButtonProps["onPress"] }
}>

export function Card({
  id,
  children,
  icon,
  title,
  width,
  height,
  className,
  action,
}: CardProps) {
  return (
    <div
      id={id}
      lens-role="card"
      className={cn(
        "px-6 py-4 w-full",
        "rounded-lg shadow-md overflow-hidden",
        "bg-white dark:bg-gray-800",
        className
      )}
      style={{ width, height }}
    >
      {(icon || title) && (
        <section
          lens-role="card-header"
          className="flex items-center justify-between space-x-4"
        >
          <div className="flex">
            {icon && <Icon name={icon} size="md" className="mr-6"></Icon>}
            {title && <Title>{title}</Title>}
          </div>
          {action && (
            <Button variant="link" onPress={action.onPress}>
              {action.title}
            </Button>
          )}
        </section>
      )}

      <section lens-role="card-body">{children}</section>
    </div>
  )
}

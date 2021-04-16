import React, { forwardRef } from "react"
import cn from "classnames"
import { Button } from "../button/Button"
import { Icon } from "../icon/Icon"
import { Size, sizeToNumeric } from "../../utils/sizeToNumeric"

type ImageOrIconProps = AvatarProps & {
  className?: string
  style?: React.CSSProperties
  otherProps?: React.HTMLAttributes<HTMLImageElement>
}

/**
 * Internal component, DO NOT USE!
 */
export const ImageOrIcon = forwardRef<HTMLImageElement, ImageOrIconProps>(
  (
    {
      url,
      label,
      size = "lg",
      onPress,
      className,
      style,
      otherProps,
    }: ImageOrIconProps,
    forwardedRef
  ) => {
    const width = sizeToNumeric(size)

    if (url) {
      return (
        <img
          lens-role="avatar"
          ref={forwardedRef}
          src={url}
          className={cn("rounded-full", className)}
          style={style}
          width={width}
          height={width}
          alt={
            onPress ? undefined : label
          } /* If the Avatar is clickable, treat it as a button, AKA no alt-text, otherwise add alt-text */
          {...otherProps}
        />
      )
    }
    return (
      <Icon
        lens-role="default-avatar"
        ref={forwardedRef as React.ForwardedRef<SVGSVGElement>}
        name="user"
        size={size}
        className={cn(
          "rounded-full",
          "bg-gray-300 dark:bg-gray-800",
          "text-gray-700 dark:text-gray-300",
          "p-1"
        )}
        {...otherProps}
      />
    )
  }
)

export type AvatarProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** URL to the image resource to display */
  url?: string
  /** A small description of this image */
  label: string
  /** Size of the Avatar */
  size?: Size
  /** Name of the user this Avatar belongs to */
  name?: string
  /** Email of the user this Avatar belongs to */
  email?: string
  /** Callback invoked when this avatar is pressed */
  onPress?: () => void
}

export function Avatar({
  id,
  url,
  label,
  size = "lg",
  name,
  email,
  onPress,
}: AvatarProps) {
  const avatar = (
    <ImageOrIcon
      url={url}
      label={label}
      size={size}
      name={name}
      email={email}
      onPress={onPress}
    />
  )

  let rendered = avatar
  if (name || email) {
    rendered = (
      <div
        // `id` must be applied at the top-most parent only
        id={onPress ? undefined : id}
        className={cn("flex items-center space-x-4", {
          "cursor-pointer": !!onPress,
        })}
      >
        {avatar}
        <div className="flex flex-col">
          <span
            lens-role="name"
            className="font-semibold text-gray-800 dark:text-gray-100"
          >
            {name}
          </span>
          <span lens-role="email" className="text-gray-600 dark:text-gray-300">
            {email}
          </span>
        </div>
      </div>
    )
  }

  if (onPress) {
    rendered = (
      <Button variant="quiet" onPress={onPress}>
        {rendered}
      </Button>
    )
  }

  return rendered
}

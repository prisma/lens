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
 * Internal component, do not use!
 */
function _ImageOrIcon(
  {
    url,
    label,
    size = "lg",
    onPress,
    className,
    style,
    otherProps,
  }: ImageOrIconProps,
  forwardedRef: React.ForwardedRef<HTMLImageElement | SVGSVGElement>
) {
  const width = sizeToNumeric(size)

  if (url) {
    return (
      <img
        ref={forwardedRef as React.ForwardedRef<HTMLImageElement>}
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

const ImageOrIcon = forwardRef(_ImageOrIcon) as (
  props: ImageOrIconProps & { ref?: React.ForwardedRef<SVGSVGElement> }
) => React.ReactElement
export { ImageOrIcon }

export type AvatarProps = {
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
  /** Callback involed when this avatar is pressed */
  onPress?: () => void
}

export function Avatar({
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
        className={cn("flex items-center space-x-4", {
          "cursor-pointer": !!onPress,
        })}
      >
        {avatar}
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 dark:text-gray-100">
            {name}
          </span>
          <span className="text-gray-600 dark:text-gray-300">{email}</span>
        </div>
      </div>
    )
  }

  if (onPress) {
    rendered = <Button variant="quiet">{rendered}</Button>
  }

  return rendered
}

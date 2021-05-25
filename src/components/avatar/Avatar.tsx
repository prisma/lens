import React, { forwardRef } from "react"
import cn from "classnames"
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
    { url, label, size = "lg", className, style, otherProps }: ImageOrIconProps,
    forwardedRef
  ) => {
    const width = sizeToNumeric(size)

    if (url) {
      return (
        <img
          lens-role="avatar"
          ref={forwardedRef}
          src={url}
          className={cn("rounded-full self-center", className)}
          style={style}
          width={width}
          height={width}
          alt={
            label
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
}

export function Avatar({
  id,
  url,
  label,
  size = "lg",
  name,
  email,
}: AvatarProps) {
  return (
    <div
      // `id` must be applied at the top-most parent only
      id={id}
      className={cn("flex items-center space-x-4")}
    >
      <ImageOrIcon
        url={url}
        label={label}
        size={size}
        name={name}
        email={email}
      />
      {(name || email) && (
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
      )}
    </div>
  )
}

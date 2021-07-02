import React, { useRef } from "react"
import cn from "classnames"
import { useHover } from "@react-aria/interactions"
import { useButton } from "@react-aria/button"
import { ImageOrIcon, AvatarProps } from "../avatar/Avatar"
import { Tooltip } from "../tooltip/Tooltip"
import { sizeToNumeric, Size } from "../../utils/sizeToNumeric"

const MAX_AVATARS = 5

export type StackedAvatarProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Size of the Avatar */
  size?: Size
  /** List of avatars to render */
  avatars: Omit<AvatarProps, "size">[]
  /** Callback invoked when StackedAvatar is pressed */
  onPress?: () => void
}

type CustomAvatarProps = {
  /** Avatar to render */
  a: Omit<AvatarProps, "size">
  /** Key used for avatar */
  i: number
  /** Size of the Avatar */
  size: Size
  /** Size as a number */
  width: number
}

/** A single avatar inside the StackedAvatar */
const SingleAvatar = ({ a, i, size, width }: CustomAvatarProps) => {
  const { hoverProps, isHovered } = useHover({})
  const avatarRef = useRef(null)

  return (
    <>
      <ImageOrIcon
        {...a}
        size={size}
        ref={avatarRef}
        otherProps={hoverProps}
        className={cn(
          "rounded-full",
          "border-2 border-lightPageBg dark:border-darkPageBg", // A border that will match the page's background color. This will make it look like overlapping Avatars have an elliptical border around them.
          {
            "z-10": isHovered,
          },
          "cursor-pointer"
        )}
        style={{
          marginLeft: i > 0 ? `-${0.3 * width}px` : "0",
        }}
      />
      {(a.name || a.email) && isHovered && (
        <Tooltip target={avatarRef} position="bottom">
          <div className="flex flex-col">
            <div lens-role="name" className="font-semibold text-sm">
              {a.name}
            </div>
            <div lens-role="email" className="text-xs">
              {a.email}
            </div>
          </div>
        </Tooltip>
      )}
    </>
  )
}

export function StackedAvatar({
  id,
  avatars,
  size = "lg",
  onPress,
}: StackedAvatarProps) {
  // We're not reusing the `Avatar` component here because the `name` and `email` fields are rendered very differently here
  // Also, not using it allows us to style this more freely.

  const width = sizeToNumeric(size)

  const truncateRef = useRef<HTMLDivElement>(null)
  const { hoverProps: truncateHoverProps, isHovered: truncateIsHovered } =
    useHover({})

  const ref = useRef<HTMLDivElement>(null)
  const { buttonProps, isPressed } = useButton({ onPress }, ref)

  return (
    <div
      ref={ref}
      id={id}
      {...buttonProps}
      className={cn("flex items-center appearance-none", {
        "opacity-75": isPressed,
      })}
    >
      {avatars.slice(0, MAX_AVATARS).map((a, i) => (
        <SingleAvatar key={i} a={a} i={i} size={size} width={width} />
      ))}
      {avatars.length > MAX_AVATARS && (
        <>
          <div
            ref={truncateRef}
            lens-role="truncate"
            {...truncateHoverProps}
            className={cn(
              "flex items-center justify-center",
              "rounded-full",
              "border-2 border-lightPageBg dark:border-darkPageBg", // A border that will match the page's background color. This will make it look like overlapping Avatars have an elliptical border around them.
              "bg-gray-700 dark:bg-gray-700",
              "text-sm text-gray-100 dark:text-gray-100"
            )}
            style={{
              width,
              height: width,
              marginLeft: "-0.5rem",
            }}
          >
            +{avatars.length - MAX_AVATARS}
          </div>
          {truncateIsHovered && (
            <Tooltip target={truncateRef} position="bottom">
              <div className="flex flex-col">
                <div className="text-sm" lens-role="truncate-count">
                  {avatars.length - MAX_AVATARS} more
                </div>
              </div>
            </Tooltip>
          )}
        </>
      )}
    </div>
  )
}

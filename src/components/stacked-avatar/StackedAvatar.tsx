import React, { useRef } from "react"
import cn from "classnames"
import { useHover } from "@react-aria/interactions"
import { ImageOrIcon, AvatarProps } from "../avatar/Avatar"
import { Tooltip } from "../tooltip/Tooltip"

export { AvatarProps }
export type StackedAvatarProps = {
  avatars: AvatarProps[]
}

export function StackedAvatar({ avatars }: StackedAvatarProps) {
  // We're not reusing the `Avatar` component here because the `name` and `email` fields are rendered very differently here
  // Also, not using it allows us to style this more freely.

  return (
    <div className="flex">
      {avatars.map((a, i) => {
        // Hover interaction for individual avatars
        const { hoverProps, isHovered } = useHover({})
        const ref = useRef(null)
        return (
          <>
            <ImageOrIcon
              ref={ref}
              {...a}
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
                marginLeft: i > 0 ? "-0.5rem" : "0",
              }}
            />
            {(a.name || a.email) && isHovered && (
              <Tooltip target={ref} position="bottom">
                <div className="flex flex-col">
                  <div>{a.name}</div>
                  <div>{a.email}</div>
                </div>
              </Tooltip>
            )}
          </>
        )
      })}
    </div>
  )
}

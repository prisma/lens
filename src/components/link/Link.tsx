import React, { forwardRef, useRef } from "react"
import cn from "classnames"
import { useHover } from "@react-aria/interactions"
import { useLink } from "@react-aria/link"
import { mergeProps } from "@react-aria/utils"
import { FocusRing } from "../focus-ring/FocusRing"

export type LinkProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** The visual text for the hyperlink */
  children: string
  /** The location this Link points to */
  href: string
  /** Controls if this link is disabled */
  isDisabled?: boolean
  /** Controls if this link should open in a new tab */
  openInNewTab?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { id, children, href, isDisabled, openInNewTab }: LinkProps,
    forwardedRef
  ) => {
    const _ref = useRef<HTMLAnchorElement>(null)
    const ref = forwardedRef || _ref
    const { linkProps } = useLink(
      { children, elementType: "a", isDisabled },
      ref as React.RefObject<HTMLAnchorElement>
    )
    const { hoverProps, isHovered } = useHover({ isDisabled })

    return (
      <FocusRing within>
        <a
          id={id}
          lens-role="link"
          ref={ref}
          {...mergeProps(linkProps, hoverProps)}
          href={href}
          rel="noopener noreferrer"
          className={cn("mx-1", "underline", {
            "text-gray-500 dark:text-gray-200": !isHovered && !isDisabled,
            "text-gray-600 dark:text-gray-500": isHovered,
            "text-gray-400 dark:text-gray-700": isDisabled,
          })}
          target={openInNewTab ? "_blank" : undefined}
        >
          {children}
        </a>
      </FocusRing>
    )
  }
)

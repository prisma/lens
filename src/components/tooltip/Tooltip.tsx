import React, { useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import cn from "classnames"
import { mergeProps } from "@react-aria/utils"
import { useOverlayPosition } from "@react-aria/overlays"
import { useTooltip } from "@react-aria/tooltip"
import { useTooltipTriggerState } from "@react-stately/tooltip"

const ARROW_SIZE = 5 // in px
const SPACING = 8

type Position = "top" | "bottom" | "left" | "right"

export type TooltipProps = React.PropsWithChildren<{
  /** React Ref of an HTML Element to position this Tooltip against */
  target: React.RefObject<HTMLElement>
  /** Position of the tooltip relative to the target. The Tooltip might still be flipped if there isn't enough space. */
  position?: Position
}>

/**
 * A tooltip is an overlay that is most commonly used to display a short description about an icon / image
 */
export function Tooltip({ children, target, position }: TooltipProps) {
  const state = useTooltipTriggerState({ isOpen: true })
  const { tooltipProps } = useTooltip({}, state)

  const ref = useRef<HTMLDivElement>(null)

  const {
    overlayProps,
    placement,
    arrowProps: ariaArrowProps,
  } = useOverlayPosition({
    targetRef: target,
    overlayRef: ref,
    shouldFlip: true,
    placement: position,
    offset: SPACING + ARROW_SIZE,
  })

  // Calculate arrow position styles on your own, taking react-aria's position into account
  // We cannot expect react-aria to position the arrow 100% correctly since it does not know what our tooltip looks like
  const [arrowProps, setArrowProps] = useState<
    React.HTMLAttributes<HTMLDivElement>
  >(ariaArrowProps)

  useLayoutEffect(() => {
    // Figure out overlay dimensions so we can position the arrow accordingly
    const overlayDimensions = ref.current?.getBoundingClientRect()

    if (!overlayDimensions) {
      return
    }

    setArrowProps({
      ...arrowProps,
      style: {
        ...arrowProps.style,
        ...(placement === "top"
          ? {
              top: overlayDimensions.height,
              left: overlayDimensions.width / 2 - ARROW_SIZE,
            }
          : undefined),
        ...(placement === "bottom"
          ? {
              left: overlayDimensions.width / 2 - ARROW_SIZE,
            }
          : undefined),
        ...(placement === "left"
          ? {
              left: overlayDimensions.width,
              top: overlayDimensions.height / 2 - ARROW_SIZE,
            }
          : undefined),
        ...(placement === "right"
          ? {
              top: overlayDimensions.height / 2 - ARROW_SIZE,
            }
          : undefined),
      },
    })
  }, [placement])

  return createPortal(
    <div
      ref={ref}
      {...mergeProps(overlayProps, tooltipProps)}
      style={{
        ...overlayProps.style,
        ...(placement === "bottom"
          ? {
              top: (overlayProps.style!.top as number) - ARROW_SIZE * 2,
            }
          : undefined), // Spacing isn't quite right with this placement, so we adjust it ourselves
        ...(placement === "right"
          ? {
              left: (overlayProps.style!.left as number) - ARROW_SIZE * 2,
            }
          : undefined), // Spacing isn't quite right with this placement, so we adjust it ourselves
      }}
      className={cn({
        "animate-slide-top": placement === "bottom",
        "animate-slide-bottom": placement === "top",
        "animate-slide-left": placement === "right",
        "animate-slide-right": placement === "left",
      })}
    >
      <Arrow arrowProps={arrowProps} position={placement as Position} />
      <div
        className={cn(
          "flex items-center",
          "rounded-md px-3 py-1.5",
          "bg-gray-800 dark:bg-gray-800",
          "text-white dark:text-white text-sm whitespace-nowrap"
        )}
        style={{
          marginTop: placement === "bottom" ? ARROW_SIZE * 2 : undefined,
          marginLeft: placement === "right" ? ARROW_SIZE * 2 : undefined,
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

type ArrowProps = {
  arrowProps: React.HTMLAttributes<HTMLElement>
  position: Position
}

function Arrow({ arrowProps, position }: ArrowProps) {
  return (
    <div
      {...arrowProps}
      className={cn("absolute", "border-gray-800 dark:border-gray-800")}
      style={{
        ...arrowProps.style,
        borderWidth: 5,
        borderLeftColor: position === "left" ? undefined : "transparent",
        borderRightColor: position === "right" ? undefined : "transparent",
        borderTopColor: position === "top" ? undefined : "transparent",
        borderBottomColor: position === "bottom" ? undefined : "transparent",
      }}
    ></div>
  )
}

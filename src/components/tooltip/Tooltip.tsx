import React, { useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import cn from "classnames"
import { mergeProps } from "@react-aria/utils"
import { useOverlayPosition } from "@react-aria/overlays"
import { useTooltip } from "@react-aria/tooltip"
import { useTooltipTriggerState } from "@react-stately/tooltip"

const ARROW_SIZE = 10 // in px

type Position = "top" | "bottom" | "left" | "right"

export type TooltipProps = React.PropsWithChildren<{
  /** React Ref of an HTML Element to position this Tooltip against */
  target: React.RefObject<HTMLElement>
  /** Position of the tooltip relative to the target. Supplying this prop forces the Tooltip to always show in the same location; automatic placement is disabled */
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
    shouldFlip: !position, // Only flip if the position isn't explicitly supplied
    placement: position,
    offset: 6,
    crossOffset: 0,
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
      console.log("no overlay")
      return
    }

    setArrowProps({
      ...arrowProps,
      style: {
        ...arrowProps.style,
        ...(placement === "top"
          ? {
              top: overlayDimensions.height,
              left: (overlayDimensions.width - ARROW_SIZE) / 2,
            }
          : {}),
        ...(placement === "bottom"
          ? {
              left: (overlayDimensions.width - ARROW_SIZE) / 2,
            }
          : {}),
        ...(placement === "left"
          ? {
              left: overlayDimensions.width,
              top: (overlayDimensions.height - ARROW_SIZE) / 2,
            }
          : {}),
        ...(placement === "right"
          ? {
              top: (overlayDimensions.height - ARROW_SIZE) / 2,
            }
          : {}),
      },
    })
  }, [placement])

  return createPortal(
    <div
      ref={ref}
      {...mergeProps(overlayProps, tooltipProps)}
      style={{
        ...overlayProps.style,
      }}
    >
      <Arrow arrowProps={arrowProps} position={placement as Position} />
      <div
        className={cn(
          "flex items-center",
          "rounded-md px-2 py-1",
          "bg-gray-800 dark:bg-gray-800 text-sm text-white dark:text-white",
          "whitespace-nowrap max-w-lg"
        )}
        style={{
          marginTop: placement === "bottom" ? ARROW_SIZE : undefined,
          marginLeft: placement === "right" ? ARROW_SIZE : undefined,
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

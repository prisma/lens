import React from "react"
import cn from "classnames"
import { Icon } from "../icon/Icon"
import { Button } from "../button/Button"

export type ToastProps = {
  /** The text to display inside the Toast */
  title: string
  /** Controls what kind of emotion this Toast represents */
  variant?: "positive" | "negative" | "neutral"
  /** Controls if this Toast does not vanish automatically */
  sticky?: boolean
  /** Callback invoked when this toast's close button is pressed */
  onClose?: () => void
}

export function Toast({ title, variant = "neutral", onClose }: ToastProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-center m-1",
        "rounded-md shadow-lg overflow-hidden",
        "bg-white dark:bg-gray-800",
        "animate-slide-bottom"
      )}
    >
      <section
        className={cn("flex items-center p-3", "border-l-8", {
          "border-green-600": variant === "positive",
          "border-red-600": variant === "negative",
          "border-blue-600": variant === "neutral",
        })}
      >
        {variant === "positive" && (
          <Icon
            name="check"
            size="sm"
            className="p-0.5 rounded-full bg-green-600 text-white"
          />
        )}
        {variant === "negative" && (
          <Icon
            name="x"
            size="sm"
            className="p-0.5 rounded-full bg-red-600 text-white"
          />
        )}
        {variant === "neutral" && (
          <Icon
            name="i"
            size="sm"
            className="p-1 rounded-full bg-blue-600 text-white"
          />
        )}
        <div
          className={cn(
            "ml-3",
            "text-sm font-semibold text-gray-800 dark:text-gray-100"
          )}
        >
          {title}
        </div>
      </section>

      <Button variant="quiet" onPress={onClose}>
        <Icon name="x" size="sm" />
      </Button>
    </div>
  )
}

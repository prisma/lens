import React, { createContext } from "react"
import cn from "classnames"
import { ToastState, useToasts } from "./useToasts"
import { Toast } from "./Toast"

// @ts-expect-error: This is okay because we cannot initialize the context with correct values here
export const ToastContext = createContext<ToastState>(null)

export function ToastContainer() {
  const { toasts, remove } = useToasts()

  return (
    <div
      className={cn(
        "fixed bottom-8 left-0 right-0",
        "flex flex-col items-center"
      )}
    >
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={() => remove(t.id)} />
      ))}
    </div>
  )
}

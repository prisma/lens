import React, { createContext } from "react"
import { ToastState, useToasts } from "./useToasts"
import { Toast } from "./Toast"

// @ts-expect-error: This is okay because we cannot initialize the context with correct values here
export const ToastContext = createContext<ToastState>(null)

export function ToastContainer() {
  const { toasts, remove } = useToasts()

  return (
    <div className="fixed bottom-4 right-4 flex-col-reverse space-y-2">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={() => remove(t.id)} />
      ))}
    </div>
  )
}

import { useContext, useRef, useState } from "react"
import { ToastContext } from "./ToastContainer"
import { ToastProps } from "./Toast"

const TOAST_TIMEOUT = 5000

export function useToasts() {
  return useContext(ToastContext)
}

type Toast = ToastProps & { id: number }
export type ToastState = {
  toasts: Toast[]
  add: (props: ToastProps) => void
  remove: (id: number) => void
}

export function useToastState(): ToastState {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastsRef = useRef(toasts)
  toastsRef.current = toasts

  function add(toast: ToastProps) {
    const id = Math.random() * 100

    setToasts([
      ...toastsRef.current,
      {
        id,
        ...toast,
        onClose: () => {
          remove(id)
          toast.onClose?.()
        },
      },
    ])

    if (!toast.sticky) {
      setTimeout(() => remove(id), TOAST_TIMEOUT)
    }
  }

  function remove(id: number) {
    setToasts(toastsRef.current.filter((t) => t.id !== id))
  }

  return { toasts, add, remove }
}

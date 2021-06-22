import { useContext, useRef, useState } from "react"
import { ToastContext } from "./ToastContainer"
import { ToastProps } from "./Toast"

const TOAST_TIMEOUT = 5000

export function useToasts() {
  return useContext(ToastContext)
}

type Toast = ToastProps & { toastId: number }
export type ToastState = {
  toasts: Toast[]
  add: (props: ToastProps) => void
  remove: (id: number) => void
  removeAll: () => void
}

export function useToastState(): ToastState {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastsRef = useRef(toasts)
  toastsRef.current = toasts

  function add(toast: ToastProps) {
    const toastId = Math.random() * 100

    setToasts([
      ...toastsRef.current,
      {
        toastId,
        ...toast,
        onClose: () => {
          remove(toastId)
          toast.onClose?.()
        },
      },
    ])

    if (!toast.sticky) {
      setTimeout(() => remove(toastId), TOAST_TIMEOUT)
    }
  }

  function remove(id: number) {
    setToasts(toastsRef.current.filter((t) => t.toastId !== id))
  }

  function removeAll() {
    setToasts([])
  }

  return { toasts, add, remove, removeAll }
}

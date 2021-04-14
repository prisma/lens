import React from "react"
import { OverlayProvider } from "@react-aria/overlays"
import { SSRProvider } from "@react-aria/ssr"
import {
  ToastContext,
  ToastContainer,
} from "../components/toast/ToastContainer"
import { useToastState } from "../components/toast/useToasts"
import "../lib.css"

type Props = React.PropsWithChildren<{}>

export function LensProvider({ children }: Props) {
  const toastState = useToastState()

  return (
    <SSRProvider>
      <OverlayProvider>
        <ToastContext.Provider value={toastState}>
          {children}
          <ToastContainer />
        </ToastContext.Provider>
      </OverlayProvider>
    </SSRProvider>
  )
}

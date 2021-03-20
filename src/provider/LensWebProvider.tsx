import React from "react"
import "../web.css"

type Props = React.PropsWithChildren<{}>

export function LensProvider({ children }: Props) {
  return <>{children}</>
}

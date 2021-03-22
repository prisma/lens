import React from "react"

export type FormProps = React.PropsWithChildren<{}>

export function Form({ children }: FormProps) {
  return (
    <>
      <form className="table w-full" style={{ borderSpacing: "0 1rem" }}>
        {children}
      </form>
    </>
  )
}

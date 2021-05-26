import React from "react"

export type FormProps = React.PropsWithChildren<{
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
}>

export function Form({ id, children }: FormProps) {
  return (
    <>
      <form
        id={id}
        className="table w-full"
        style={{ borderSpacing: "0 1rem" }}
      >
        {children}
      </form>
    </>
  )
}

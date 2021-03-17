import React from "react";

type FormProps = React.PropsWithChildren<{}>;

export function Form({ children }: FormProps) {
  return (
    <section className="table w-full" style={{ borderSpacing: "0 1rem" }}>
      {children}
    </section>
  );
}

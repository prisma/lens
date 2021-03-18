import React from "react";

type CardProps = React.PropsWithChildren<{
  /** An identifying icon */
  icon?: string;
  /** The title of the PageTitle */
  title?: string;
}>;

export function Card({ children, icon, title }: CardProps) {
  return <div>Card</div>;
}

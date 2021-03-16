import React from "react";
import "../global.css";

type Props = React.PropsWithChildren<{}>;
export function LensProvider({ children }: Props) {
  return children;
}

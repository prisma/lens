import React, { ReactElement } from "react";

import "../global.css";

type Props = {
  children: ReactElement;
};

export function LensProvider({ children }: Props) {
  return <>{children}</>;
}

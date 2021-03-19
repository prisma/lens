import React from "react";
import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import "../lib.css";

type Props = React.PropsWithChildren<{}>;

export function LensProvider({ children }: Props) {
  return (
    <SSRProvider>
      <OverlayProvider>{children}</OverlayProvider>
    </SSRProvider>
  );
}

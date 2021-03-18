import React from "react";
import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import "../global.css";

type Props = React.PropsWithChildren<{}>;

export function LensProvider({ children }: Props) {
  return (
    <SSRProvider>
      <OverlayProvider className="w-full">{children}</OverlayProvider>
    </SSRProvider>
  );
}

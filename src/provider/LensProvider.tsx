import React, { ReactElement } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { theme } from "../theme";

const BaseStyles = createGlobalStyle`
  /*---- JETBRAINS MONO ----*/
  @font-face {
    font-family: "Jetbrains Mono";
    font-display: swap;
    src: url("https://www.prisma.io/fonts/jetbrains-mono/regular.woff2")
        format("woff2"),
      url("https://www.prisma.io/fonts/jetbrains-mono/regular.woff")
        format("woff");
  }

  /*---- BARLOW BOLD ----*/
  @font-face {
    font-family: "Barlow";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("https://www.prisma.io/fonts/barlow-v5-latin/barlow-v5-latin-700.woff2")
        format("woff2"),
      url("https://www.prisma.io/fonts/barlow-v5-latin/barlow-v5-latin-700.woff")
        format("woff");
  }

  /*---- INTER ----*/
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("https://www.prisma.io/fonts/inter/Inter-Regular.woff2?v=3.15")
        format("woff2"),
      url("https://www.prisma.io/fonts/inter/Inter-Regular.woff?v=3.15")
        format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url("https://www.prisma.io/fonts/inter/Inter-Italic.woff2?v=3.15")
        format("woff2"),
      url("https://www.prisma.io/fonts/inter/Inter-Italic.woff?v=3.15")
        format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url("https://www.prisma.io/fonts/inter/Inter-Medium.woff2?v=3.15")
        format("woff2"),
      url("https://www.prisma.io/fonts/inter/Inter-Medium.woff?v=3.15")
        format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url("https://www.prisma.io/fonts/inter/Inter-MediumItalic.woff2?v=3.15")
        format("woff2"),
      url("https://www.prisma.io/fonts/inter/Inter-MediumItalic.woff?v=3.15")
        format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url("https://www.prisma.io/fonts/inter/Inter-SemiBold.woff2?v=3.15")
        format("woff2"),
      url("https://www.prisma.io/fonts/inter/Inter-SemiBold.woff?v=3.15")
        format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url("https://www.prisma.io/fonts/inter/Inter-SemiBoldItalic.woff2?v=3.15")
        format("woff2"),
      url("https://www.prisma.io/fonts/inter/Inter-SemiBoldItalic.woff?v=3.15")
        format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("https://www.prisma.io/fonts/inter/Inter-Bold.woff2?v=3.15")
        format("woff2"),
      url("https://www.prisma.io/fonts/inter/Inter-Bold.woff?v=3.15")
        format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url("https://www.prisma.io/fonts/inter/Inter-BoldItalic.woff2?v=3.15")
        format("woff2"),
      url("https://www.prisma.io/fonts/inter/Inter-BoldItalic.woff?v=3.15")
        format("woff");
  }
`;

type Props = {
  children: ReactElement;
};

export function LensProvider({ children }: Props) {
  return (
    <>
      <BaseStyles />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      {/* {children} */}
    </>
  );
}

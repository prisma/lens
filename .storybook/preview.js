import React from "react";
import { themes } from "@storybook/theming";
import { createGlobalStyle } from "styled-components";

import { theme as lensTheme } from "../src/theme";
import { LensProvider } from "../src/provider/LensProvider";

// TODO:: remove when we have proper normalize in BaseStyle
const TemporaryGlobalStyle = createGlobalStyle`
 html{
  font-family: ${lensTheme.fonts.text}
 }
`;

export const decorators = [
  Story => (
    <LensProvider>
      <TemporaryGlobalStyle />
      <Story />
    </LensProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  darkMode: {
    darkClass: "dark",
    dark: { ...themes.dark, appContentBg: "#12161e" },
    stylePreview: true,
  },
};

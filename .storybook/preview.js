import React from "react";
import { createGlobalStyle } from "styled-components";

import { theme } from "../src/theme";
import { LensProvider } from "../src/provider/LensProvider";

// TODO:: remove when we have proper normalize in BaseStyle
const TemporaryGlobalStyle = createGlobalStyle`
 html{
  font-family: ${theme.fonts.text}
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
};

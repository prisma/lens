import React from "react";
import { createGlobalStyle } from "styled-components";

import theme from "../src/theme";
import BaseStyle from "./lib/BaseStyle";

// TODO:: remove when we have proper normalize in BaseStyle
const TemporaryGlobalStyle = createGlobalStyle`
 html{
  font-family: ${theme.fonts.text}
 }
`;

export const decorators = [
  Story => (
    <>
      <TemporaryGlobalStyle />
      <BaseStyle />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
};

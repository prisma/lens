import React from "react";
import { themes } from "@storybook/theming";
import { LensProvider } from "../src/provider/LensProvider";

export const decorators = [
  Story => (
    <LensProvider>
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

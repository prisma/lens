import React from "react";
import { themes } from "@storybook/theming";
import { LensProvider } from "../src/provider/LensProvider";

const pkg = require("../package.json");
const version = pkg.version;

export const decorators = [
  Story => (
    <LensProvider>
      <div className="fixed top-0 left-0 p-2 text-xs text-gray-500">
        {version}
      </div>
      <div className="flex justify-center" style={{ minWidth: 580 }}>
        <Story />
      </div>
    </LensProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  darkMode: {
    darkClass: "dark",
    dark: { ...themes.dark, appContentBg: "#12161E" },
    light: { ...themes.light, appContentBg: "#F7FAFC" /* gray-100 */ },
    stylePreview: true,
  },
};

import React from "react"
import { themes } from "@storybook/theming"
import { LensProvider } from "../src/provider/LensProvider"

export const decorators = [
  (Story) => (
    <LensProvider>
      <div className="flex justify-center" style={{ minWidth: 580 }}>
        <Story />
      </div>
    </LensProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  darkMode: {
    darkClass: "dark",
    dark: { ...themes.dark, appContentBg: "#12161E" },
    light: { ...themes.light, appContentBg: "#F7FAFC" /* gray-100 */ },
    stylePreview: true,
  },
}
